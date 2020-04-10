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

server.get('/', function(req, res) {
  res.render('index', {
    textAreaInput: '',
    romaji: '',
    textGlossing: [],
  });
});

server.post('/process', async function(req, res) {
  const rawText = req.body.rawText;
  axios.all([romajiHelper.getRomaji(rawText), textGlossingHelper.getGlossingRows(rawText)])
      .then(axios.spread(function(romajiText, glossing) {
        res.render('index', {
          textAreaInput: rawText,
          romaji: romajiText,
          textGlossing: glossing,
        });
      }));
});

server.set('port', (process.env.PORT || 8080));
server.listen(server.get('port'), () => {
  console.log('Node server listening to port ' +
    server.get('port'));
});
