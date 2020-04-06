const wanakana = require('wanakana');
const Kuroshiro = require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

const beforeChange = ['o', 'ha', 'e', 'ichi nin', 'ō', 'ī', 'ā', 'ū'];
const afterChange = ['wo', 'wa', 'he', 'hitori', 'ou', 'ii', 'aa', 'uu'];
const needToMerge = ['tte', 'ta', 'da', 'i', 'te',
  'de', 'nai', 'zu', 'n', 'u', 'tara', 'ba'];

/**
 * dsds
 */
class RomajiHelper {
  /** */
  constructor() {
    this.kuroshiro = new Kuroshiro();
    this.kuromojiAnalyzer = new KuromojiAnalyzer();
    this.kuroshiroInitialized = false;
    this.initKuroshiro();
  }

  /** Initializes KuromojiAnalyzer and sets kuroshiroInitialized to true if successful. */
  async initKuroshiro() {
    this.kuroshiro.init(this.kuromojiAnalyzer)
        .then(() => {
          this.kuroshiroInitialized = true;
        });
  }

  /** Given raw Japanese text, return the text as Romaji spaced by word */
  async getRomaji(rawText) {
    if (!this.kuroshiroInitialized) {
      await this.initKuroshiro();
    }
    return this.kuroshiro.convert(rawText, {to: 'hiragana', mode: 'spaced'})
        .catch((error) => {
          console.log(error);
          return '';
        })
        .then((hiraganaText) => {
          return wanakana.toRomaji(hiraganaText);
        });
  }

  /** Given a line of romaji, capitalize certain letters. */
  fixCapitalization(line) {
    if (line.match('[a-z]') == null) { // no letters to fix
      return line;
    }
    let firstAlphaIdx = line.match('[a-z]').index;
    let outputLine = this.strReplaceAt(line, firstAlphaIdx, line[firstAlphaIdx].toUpperCase());
    line = line.substring(firstAlphaIdx + 1, line.length);

    while (line.match('[.!? ]') != null) {
      line = line.substring(line.match('[.!? ]').index + 1, line.length);
      if (line.match('[a-z]') == null) {
        break;
      } else {
        firstAlphaIdx = line.match('[a-z]').index;
        outputLine = this.strReplaceAt(outputLine, firstAlphaIdx, line[firstAlphaIdx].toUpperCase());
        line = line.substring(firstAlphaIdx + 1, line.length);
      }
    }
    return outputLine;
  }

  /** Replace index character in string with replacement */
  strReplaceAt(string, idx, replacement) {
    return string.substr(0, idx) + replacement +
      string.substr(idx + replacement.length);
  }

  /** Given a line of romaji, apply common fixes. */
  applyCommonFixes(line) {
    const words = line.match(/\S+/g);
    let index = -2;
    for (let i = 0; i < words.length; i++) {
      let check = words[i];
      let prefix = '';
      let suffix = '';
      if (words[i].length > 2) {
        if ((words[i][0].match(/[^a-zA-Z]/) != null) &&
          (words[i][words[i].length - 1].match(/[^a-zA-Z]/) != null)) {
          check = words[i].substring(1, words[i].length - 1);
          prefix = words[i][0];
          suffix = words[i][words[i].length - 1];
        }
      }
      if (words[i].length > 1) {
        if ((words[i][0].match(/[^a-zA-Z]/) != null)) {
          check = words[i].substring(1, words[i].length);
          prefix = words[i][0];
        }
        if ((words[i][words[i].length - 1].match(/[^a-zA-Z]/) != null)) {
          check = words[i].substring(0, words[i].length - 1);
          suffix = words[i][words[i].length - 1];
        }
      }
      index = beforeChange.indexOf(check);
      if (index > -1) {
        words[i] = prefix + afterChange[index] + suffix;
      }
      index = needToMerge.indexOf(check);
      if (index > 0) {
        words[i - 1] += words[i];
        words.splice(i, 1);
      }
    }
    return words.join(' ');
  }
}

module.exports = RomajiHelper;
