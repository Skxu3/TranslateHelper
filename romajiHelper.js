const wanakana = require('wanakana');
const Kuroshiro = require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

const simpleChangeDic = {
  'o': 'wo',
  'ha': 'wa',
  'e': 'he',
};
const complexChangeDic = {
  'ichi nin': 'hitori',
  'de mo': 'demo',
  'saken deru': 'sakenderu',
};
const toMerge = ['i', 'u', 'n', 'ba', 'ta', 'da', 'te', 'tte', 'nai', 'tai', 'tara', 'reru', 'rareru'];

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
          console.log(error.message);
          console.log(error.stack);
          return '';
        })
        .then((hiraganaText) => {
          const romaji = wanakana.toRomaji(hiraganaText);

          return romaji.split('\n').map((line) => {
            return this.fixCapitalization(this.applyCommonFixes(line));
          }).join('\n');
        });
  }

  /** Given a line of romaji, capitalize certain letters. */
  fixCapitalization(line) {
    if (line.match('[a-z]') == null) { // no letters to fix
      return line;
    }

    let firstLetterIdx = line.match('[a-zA-Z]').index;
    let outputLine = this.strReplaceAt(line, firstLetterIdx,
        line[firstLetterIdx].toUpperCase());
    let offset = firstLetterIdx + 1;
    line = line.substring(offset, line.length);

    while (line.match('[.!?\t]') != null) {
      const splitterIdx = line.match('[.!?\t]').index;
      offset += splitterIdx;
      line = line.substring(splitterIdx + 1, line.length);
      if (line.match('[a-z]') == null) {
        break;
      } else {
        firstLetterIdx = line.match('[a-zA-Z]').index;
        offset += firstLetterIdx + 1;
        outputLine = this.strReplaceAt(outputLine, offset,
          line[firstLetterIdx].toUpperCase());
        offset += 1;
        line = line.substring(firstLetterIdx + 1, line.length);
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
    if (line.match(/\S+/g) == null) {
      return line;
    }
    for (const before in complexChangeDic) {
      if (line.indexOf(before) > 0) {
        line = line.replace(before, complexChangeDic[before]);
      }
    }
    const words = line.match(/\S+/g);
    const result = [];
    for (let i = 0; i < words.length; i++) {
      if (toMerge.indexOf(words[i]) > 0) {
        result[result.length - 1] += words[i];
        continue;
      }
      words[i] = (words[i] in simpleChangeDic) ?
        simpleChangeDic[words[i]] : words[i];
      result.push(words[i]);
    }
    return result.join(' ');
  }
}

module.exports = RomajiHelper;
