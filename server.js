const cheerio = require('cheerio');
const express = require('express');
const axios = require('axios');
const wanakana = require('wanakana');
const Kuroshiro = require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');
  
const kuroshiro = new Kuroshiro();
const kuromojiAnalyzer = new KuromojiAnalyzer();

let kuroshiroInitialized = false;
kuroshiro.init(kuromojiAnalyzer).then(() => {
    kuroshiroInitialized = true;
})

var server = express();

server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded());
server.use(express.static('public/'));

server.get('/', function(req, res) {
    res.render('index', {
    	textAreaInput: "",
    	romaji: "",
    	textGlossing: []
    });
});

server.post('/process', async function(req, res) {
    var rawText = req.body.rawText;
    
    var romajiText = "";
    var glossing = [];
    axios.all([getRomaji(rawText), getGlossingRows(rawText)])
        .then(axios.spread(function(romajiText, glossing) {
            res.render('index', {
                textAreaInput: rawText,
                romaji: romajiText,
                textGlossing: glossing
            });
        }));
});


async function getRomaji(rawText) {
    if (!kuroshiroInitialized) {
        await kuroshiro.init(kuromojiAnalyzer);
    }
    return kuroshiro.convert(rawText, {to: "hiragana", mode: "spaced"})
        .catch ((error) => {
            return "";
        })
        .then((hiraganaText) => {
            return wanakana.toRomaji(hiraganaText);
        });
}

function getGlossingRows(rawText) {
    var wwwjdicUrl = 'http://nihongo.monash.edu/cgi-bin/wwwjdic?EZIH' + encodeURIComponent(rawText);
    return axios.get(wwwjdicUrl)
        .catch((error) => {
            console.log(error.data);
            return [];
        })
        .then((response) => {
            return translationRowsToGlossing(response.data);
        });
}

function translationRowsToGlossing(rawRows) {
    var glossing = [];
    let $ = cheerio.load(rawRows);
    let allWords = [];
    $('li').each(function(i, elem) {
        let rowParts = translationRowToParts($(this).text());
        if (!allWords.includes(rowParts['word'])) {
            glossing.push(rowParts);
            allWords.push(rowParts['word']);
        }
    });
    return glossing;
}

/** 
 * Given a row of translation, parse it into parts
 *
 * @return [word, hiragana, pos1, def1, pos2, def2...]
 */
function translationRowToParts(translationRow) {
    let parts = {}; 
    if (translationRow.includes("Possible inflected")) {
        idxEndOfMsg = translationRow.indexOf(")");
        translationRow = translationRow.substring(idxEndOfMsg + 1, translationRow.length); 
    }
    idxStartOfJWN = translationRow.indexOf("JWN");
    if (idxStartOfJWN > 0) {
        translationRow = translationRow.substring(0, idxStartOfJWN).trim(); 
    }

    idxStartOfHiragana = translationRow.indexOf("【");
    idxStartOfPOS = translationRow.indexOf("(");
    var idxEndOfWord = idxStartOfHiragana > 0 ? idxStartOfHiragana : idxStartOfPOS;
    parts['word'] = translationRow.substring(0, idxEndOfWord).trim(); // word
    translationRow = translationRow.substring(idxEndOfWord, translationRow.length); 

    let hiragana = "";
    let hiraganaMatcher = translationRow.match(/\【(.*?)\】/);
    if (hiraganaMatcher != null && hiraganaMatcher.length > 0) {
        // regex won't match "[Partial Match!]" bc different bracket
        hiragana = hiraganaMatcher.pop(); 
    }
    parts['hiragana'] = hiragana;

    let posMatcher = translationRow.match(/\(((adj|adv|n|aux)[-[a-z]*]*|v|conj|exp|id|int|pn|prt|pref|suf|(v[\d|a-z]+[-[a-z]*))\)/g);
    let defs = [];
    if (posMatcher != null && posMatcher.length > 0) {
      for (var i = posMatcher.length - 1; i >= 0; i--) {
        let def = {};
        let pos = posMatcher[i];

        idxStartOfPOS = translationRow.indexOf(pos);
        def['pos'] = translationRow.substring(idxStartOfPOS, idxStartOfPOS + pos.length).replace(/[()]/g, ''); // pos  
        
        definition = translationRow.substring(idxStartOfPOS + pos.length, translationRow.length).trim();
        if ((definition.match(/;/g)||[]).length == 1) {
            definition = definition.replace(';', '');
        }
        def['definition'] = definition; // definition

        translationRow = translationRow.substring(0, idxStartOfPOS);
        defs.push(def);
      }
    }
    parts['defs'] = defs.reverse();
    return parts;
}

server.listen(8080);