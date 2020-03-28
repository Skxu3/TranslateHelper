var cheerio = require('cheerio');
var express = require('express');
var request = require('request');
var server = express();

server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded());
server.use(express.static('public/'));

server.get('/', function(req, res) {
    res.render('index', {
    	textAreaInput: "",
    	romaji: "",
    	textGlossing: ""
    });
});

server.post('/process', function(req, res) {
    var rawText = req.body.rawText;
	var wwwjdicUrl = 'http://nihongo.monash.edu/cgi-bin/wwwjdic?EZIH' + encodeURIComponent(rawText);
    var meanings = "";
    request({
        method: 'GET',
        url: wwwjdicUrl
    }, (error, result, body) => {
        if (error) return console.error(error);
        
        let $ = cheerio.load(body);

        $('li').each(function(i, elem) {
            console.log($(this).text());
            // var newRow = $("<tr>");
            // var cols = "";

            let parts = translationRowToParts($(this).text());

            // cols += '<td class="col-sm-3">' + word + '"</td>';
            // cols += '<td class="col-sm-1"><input type="button" class="delete-button btn btn-md btn-danger"  value="Delete"></td>';
            // newRow.append(cols);

            // meanings += newRow + "</tr>";
            //meanings += $(this).text() + "\n";
        });

        res.render('index', {
            textAreaInput: rawText,
            romaji: rawText,
            textGlossing: meanings
        });

    });


});

/** 
 * Given a row of translation, parse it into parts
 *
 * @return [word, hiragana, pos1, def1, pos2, def2...]
 */
function translationRowToParts(translationRow){
    let parts = []; 
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
    parts.push(translationRow.substring(0, idxEndOfWord).trim()); // word
    translationRow = translationRow.substring(idxEndOfWord, translationRow.length); 

    let hiragana = "";
    let hiraganaMatcher = translationRow.match(/\【(.*?)\】/);
    if (hiraganaMatcher != null && hiraganaMatcher.length > 0) {
        // regex won't match "[Partial Match!]" bc different bracket
        hiragana = hiraganaMatcher.pop(); 
    }
    parts.push(hiragana);

    let posMatcher = translationRow.match(/\(((adj|adv|n|aux)[-[a-z]*]*|v|conj|exp|id|int|pn|prt|pref|suf|(v[\d|a-z]+[-[a-z]*))\)/g);
    if (posMatcher != null && posMatcher.length > 0) {
      let i = posMatcher.length - 1;
      let defs = [];
      for (i; i >= 0; i--) {
        let pos = posMatcher[i];
        idxStartOfPOS = translationRow.indexOf(pos);
        defs.unshift(translationRow.substring(idxStartOfPOS + pos.length, translationRow.length).trim()); // definition        
        defs.unshift(translationRow.substring(idxStartOfPOS, idxStartOfPOS + pos.length).replace(/[()]/g, '')); // pos  
        translationRow = translationRow.substring(0, idxStartOfPOS);
      }
      parts = parts.concat(defs);
    }
    console.log(parts);
    return parts;
}

server.listen(8080);