const axios = require('axios');
const cheerio = require('cheerio');

const wwjdicBaseUrl = 'http://nihongo.monash.edu/cgi-bin/wwwjdic?EZIH';

/**
 * dsds
 */
class TextGlossingHelper {
  constructor() {
    this.allWords = [];
  }

  /** Given raw Japanese text, convert it to a list of translation parts */
  getGlossingRows(rawText) {
    this.allWords = [];

    // split raw text into chunks to not overwhelm wwdjic server
    const textChunks = this.preprocessText(rawText);

    const promises = textChunks.map((text) => {
      return axios.get(wwjdicBaseUrl + encodeURIComponent(text));
    });

    return axios.all(promises)
        .catch((error) => {
          console.log('textGlossingHelper error');
          return [];
        })
        .then((results) => {
          return [].concat(...results.map((response) => {
            return this.translationRowsToGlossing(response.data);
          }));
        });
  }

  /**
   * Given raw Japanese text, remove all non-Japanese characters,
   * then break apart text into chunks of <200 characters.
   *
   * Adds \n between every line of text.
   */
  preprocessText(rawText) {
    const uniqueLines = Array.from(new Set(rawText.split('\n')));
    const textChunks = [];
    let text = '';
    for (let i = 0; i < uniqueLines.length; i++) {
      const line = this.extractJapaneseStr(uniqueLines[i]);
      if (line !== '') {
        if (line.length + text.length < 200) {
          text += line + '\n';
        } else {
          textChunks.push(text);
          text = '';
        }
      }
    }
    if (text !== '' && (text.length < 200)) {
      textChunks.push(text);
    }
    return textChunks;
  }

  /**
   * Extract only the Japanese characters from string.
   * @param string
   */
  extractJapaneseStr(string) {
    const result = string.match(/[\u3041-\u3096\u3400-\u9FFF]/g);
    return (result == null) ? '' : result.join('');
  }

  /**
   * Given the wwwjdicResponse, parse it and convert each row of the response to a glossing.
   * Then return the collection of all glossings.
   */
  translationRowsToGlossing(wwwjdicResponse) {
    const glossing = [];
    const $ = cheerio.load(wwwjdicResponse);
    $('body li').each((i, elem) => {
      const rowParts = this.translationRowToParts($(elem).text());
      if (!this.allWords.includes(rowParts['word'])) {
        glossing.push(rowParts);
        this.allWords.push(rowParts['word']);
      }
    });
    return glossing;
  }

  /**
   * Given a row of translation, parse it into parts
   * @return {dictionary} {word, hiragana,
   * [{pos, definition}, {pos, definition}...]}
   */
  translationRowToParts(translationRow) {
    const parts = {};

    if (translationRow.includes('Possible inflected')) {
      const idxEndOfMsg = translationRow.indexOf(')');
      translationRow = translationRow.substring(idxEndOfMsg + 1, translationRow.length);
    }

    const idxStartOfJWN = translationRow.indexOf('JWN');
    if (idxStartOfJWN > 0) {
      translationRow = translationRow.substring(0, idxStartOfJWN).trim();
    }

    const idxStartOfHiragana = translationRow.indexOf('【');
    const idxStartOfPOS = translationRow.indexOf('(');
    const idxEndOfWord = idxStartOfHiragana > 0 ? idxStartOfHiragana : idxStartOfPOS;
    parts['word'] = translationRow.substring(0, idxEndOfWord).trim(); // word
    translationRow = translationRow.substring(idxEndOfWord, translationRow.length);

    let hiragana = '';
    const hiraganaMatcher = translationRow.match(/【(.*?)】/);
    if (hiraganaMatcher != null && hiraganaMatcher.length > 0) {
      // regex won't match "[Partial Match!]" bc different bracket
      hiragana = hiraganaMatcher.pop();
    }
    parts['hiragana'] = hiragana;

    const posMatcher = translationRow.match(/\(((adj|adv|n|aux)[-[a-z]*]*|v|conj|exp|id|int|pn|prt|pref|suf|(v[\d|a-z]+[-[a-z]*))\)/g);
    const defs = [];
    if (posMatcher != null && posMatcher.length > 0) {
      for (let i = posMatcher.length - 1; i >= 0; i--) {
        const def = {};
        const pos = posMatcher[i];

        const idxStartOfPOS = translationRow.indexOf(pos);
        def['pos'] = translationRow.substring(idxStartOfPOS, idxStartOfPOS + pos.length).replace(/[()]/g, ''); // pos

        let definition = translationRow.substring(idxStartOfPOS + pos.length, translationRow.length).trim();
        if ((definition.match(/;/g) || []).length === 1) { // number of ; is 1
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
}

module.exports = TextGlossingHelper;
