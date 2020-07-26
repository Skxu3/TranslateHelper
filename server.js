const express = require('express');
const axios = require('axios');
const TextGlossingHelper = require('./textGlossingHelper.js');
const RomajiHelper = require('./romajiHelper.js');

const textGlossingHelper = new TextGlossingHelper();
const romajiHelper = new RomajiHelper();

const server = express();
server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static('public/'));

const textGlossingConfig = {
  dictionaryType: 'wordNet', // or 'textGloss'
  hideCommonWords: true,
};

const romajiConfig = {
  outputFormat: 'romaji', // or 'furigana'
  capitalizeFirstLetter: false,
};

const uiConfig = {
  autoCopyToClipboard: true,
};

server.get('/', function(req, res) {
  res.render('index', {
    textAreaInput: '',
    romaji: '',
    textGlossing: [],
    queryInput: '',
    queryResult: [],
    // uiConfig: {},
  });
});

server.post('/process', async function(req, res) {
  const rawText = req.body.rawText;
  const text = rawText.replace(/(\r\n){2,}/g, '$1\n');
  axios.all([romajiHelper.getRomaji(romajiConfig, text), textGlossingHelper.getGlossingRows(textGlossingConfig, text)])
      .then(axios.spread(function(romajiText, glossing) {
        res.render('index', {
          textAreaInput: text,
          romaji: romajiText,
          textGlossing: glossing,
          queryInput: '',
          queryResult: [],
          // uiConfig: uiConfig,
        });
      }));
});

server.set('port', (process.env.PORT || 8080));
server.listen(server.get('port'), () => {
  console.log('Node server listening to port ' +
    server.get('port'));
});
