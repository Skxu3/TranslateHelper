const wanakana = require('wanakana');
const Kuroshiro = require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

const preprocessDic = {
  '照る': 'teru',
  '出る': 'deru',
};

/** Dictionary of simple changes to apply to raw romaji output from kuroshiro. */
const simpleChangeDic = {
  'o': 'wo',
  'ha': 'wa',
  'e': 'he',
  '‘ ': '\'',
};

/** Dictionary of complex changes to apply to raw romaji output from kuroshiro. */
const complexChangeDic = {
  'ichi nin': 'hitori',
  'ichi kai': 'ikkai',
  'ichi hai': 'ippai',
  'ichi hon': 'ippon',
  'ichi satsu': 'issatsu',
  'you na': 'youna',
  'you ni': 'youni',
};

// Wouldn't be by themselves.
const counters = ['bu', 'dai', 'hai', 'hiki', 'kai', 'mai', 'nin', 'satsu', 'tsu'];

/** Dictionary of changes to apply to raw romaji output from kuroshiro. */
const toMerge = [
  'u', 'n',
  'ba', 'sa', 'ta', 'da', 'te', 'ze', 'zu',
  'kou', 'tte', 'nai', 'tai', 'kan',
  'tara', 'tari', 'reru', 'rareru',
];

const postMerge = [
  'takunai',
];

/**
 * Helper class to create romanization of raw Japanese text.
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
  async getRomaji(config, rawText) {
    if (!this.kuroshiroInitialized) {
      await this.initKuroshiro();
    }

    if (config['outputFormat'] === 'furigana') {
      return this.kuroshiro.convert(rawText, {to: 'hiragana', mode: 'furigana'});
    }
    const preprocessedText = this.preprocessText(rawText);
    return this.kuroshiro.convert(preprocessedText, {to: 'hiragana', mode: 'spaced'})
        .catch((error) => {
          console.log(error.message);
          console.log(error.stack);
          return '';
        })
        .then((hiraganaText) => {
          // return hiraganaText;
          const romaji = wanakana.toRomaji(hiraganaText);
          console.log(romaji);
          return romaji.split('\n').map((line) => {
            const tempRomaji = this.fixSpacing(this.applyCommonFixes(line));
            console.log(this.applyCommonFixes(line));
            console.log(tempRomaji);
            return config['capitalizeFirstLetter'] ?
              this.fixCapitalization(tempRomaji) :
              tempRomaji;
          }).join('\n');
        });
  }

  preprocessText(rawRomaji) {
    let text = rawRomaji;
    for (const word in preprocessDic) {
      text = text.replace(word, preprocessDic[word]);
    }
    return text;
  }

  /**
   * Given raw romaji, rid extra space near punctuations and
   * in between words.
   */
  fixSpacing(rawRomaji) {
    return rawRomaji
        .replace(/  +/g, ' ')
        .replace(/(\(|\[)(\s)/g, '$1')
        .replace(/(\s)(\)|\])/g, '$2')
        .replace(/(\s)(\.|,|!|%|;|:|\?)/g, '$2')
        .replace(/(\s)('|`|’)(\s)/g, '$2');
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
      if (line.includes(before)) {
        line = line.replace(before, complexChangeDic[before]);
      }
    }
    const words = line.match(/\S+/g);
    const result = [words[0]];
    for (let i = 1; i < words.length; i++) {
      if (toMerge.includes(words[i])) {
        result[result.length - 1] += words[i];
        if (postMerge.includes(result[result.length - 1])) {
          const secondMerge = result.pop();
          result[result.length - 1] += secondMerge;
        }
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
