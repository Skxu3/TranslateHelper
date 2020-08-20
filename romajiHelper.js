const wanakana = require('wanakana');
const Kuroshiro = require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');
const {simpleChangeChars, simpleChangeWords, complexChangeDic, split, toMerge, hyphenMerge, postMerge, conditionalPostMerge, interrogative} = require('./romajiUtils.js');
const {macroDic} = require('./romajiMacroDic.js');


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
          return this.processRomaji(romaji, config);
        });
  }

  preprocessText(rawRomaji) {
    let text = rawRomaji;
    for (const char in simpleChangeChars) {
      text = text.replace(char, simpleChangeChars[char]);
    }
    return text;
  }

  processRomaji(romaji, config) {
    return romaji.split('\n').map((line) => {
      const tempRomaji = this.fixSpacing(this.applyCommonFixes(line));
      // const tempRomaji = this.fixSpacing(this.applyMacroDic(line));
      return config['capitalizeFirstLetter'] ?
        this.fixCapitalization(tempRomaji) :
        tempRomaji;
    }).join('\n');
  }

  /**
   * Given romaji, rid extra space near punctuations and
   * in between words.
   */
  fixSpacing(romaji) {
    let fixedSpacing = romaji
        .replace(/  +/g, ' ')
        .replace(/(\(|\[|")(\s)/g, '$1')
        .replace(/(\s)(\)|\]|\.|,|!|%|;|:|\?|")/g, '$2');
    const apostrophe = fixedSpacing.match(/'/g);
    if (!apostrophe) {
      return fixedSpacing;
    }
    let finalString = '';
    let numApostrophe = apostrophe.length;
    while (numApostrophe > 1) {
      const idxFirstApostrophe = fixedSpacing.indexOf('\'');
      const idxSecondApostrophe = fixedSpacing.indexOf('\'', idxFirstApostrophe + 1);
      const fixed = fixedSpacing.substring(idxFirstApostrophe, idxSecondApostrophe + 1)
          .replace('\' ', '\'')
          .replace(' \'', '\'');
      finalString += fixedSpacing.substring(0, idxFirstApostrophe) + fixed;
      fixedSpacing = fixedSpacing.substring(idxSecondApostrophe + 1, fixedSpacing.length);
      numApostrophe -= 2;
    }
    if (numApostrophe == 1) {
      finalString += fixedSpacing.replace(/(\s)(')(\s)/g, '$2');
    } else {
      finalString += fixedSpacing;
    }
    return finalString;
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
    for (const toSplit of split) {
      const toSplitPosition = line.indexOf(toSplit);
      if (toSplitPosition > 0 && line.charAt(toSplitPosition - 1) !== ' ') {
        line = line.substring(0, toSplitPosition) +
          ' ' + line.substring(toSplitPosition, line.length);
      }
    }
    const words = line.match(/\S+/g);
    const result = [];
    for (let i = 0; i < words.length; i++) {
      words[i] = (words[i] in simpleChangeWords) ?
        simpleChangeWords[words[i]] : words[i];

      const lastResultIndex = result.length - 1;
      if (i > 0) {
        if (hyphenMerge.includes(words[i])) {
          result[lastResultIndex] += '-' + words[i];
          continue;
        }
        if (toMerge.includes(words[i])) {
          result[lastResultIndex] += words[i];
          if (postMerge.includes(result[lastResultIndex])) {
            const secondMerge = result.pop();
            result[lastResultIndex-1] += secondMerge;
          }
          continue;
        }
        if (Object.keys(conditionalPostMerge).includes(words[i])) {
          const prevWords = conditionalPostMerge[words[i]];
          let prevWord = '';
          if (!Array.isArray(prevWords) && result[lastResultIndex].endsWith(prevWords)) {
            prevWord = prevWords;
          } else if (Array.isArray(prevWords)) {
            for (const prev of prevWords) {
              if (result[lastResultIndex].endsWith(prev)) {
                prevWord = prev;
              }
            }
          }
          if (prevWord !== '' && result[lastResultIndex].length > prevWord.length) {
            result[lastResultIndex] += words[i];
            continue;
          }
        }
        if (interrogative.closed.includes(words[i]) && interrogative.words.includes(words[i-1])) {
          result[lastResultIndex] += words[i];
          continue;
        }
      }
      let fixedInterrogative = false;
      for (const prefix of interrogative.words) {
        if (words[i].startsWith(prefix)) {
          for (const open of interrogative.open) {
            if (words[i].substring(prefix.length, words[i].length).startsWith(open)) {
              result.push(prefix);
              result.push(words[i].substring(prefix.length, words[i].length));
              fixedInterrogative = true;
            }
          }
        }
      }
      if (fixedInterrogative) {
        continue;
      }
      result.push(words[i]);
    }
    return result.join(' ');
  }

  /** Given a line of romaji, apply common fixes. */
  applyMacroDic(line) {
    if (line.match(/\S+/g) == null) {
      return line;
    }
    for (const before in macroDic) {
      if (line.includes(before)) {
        line = line.replace(before, macroDic[before]);
      }
    }
    return line;
  }
}

module.exports = RomajiHelper;
