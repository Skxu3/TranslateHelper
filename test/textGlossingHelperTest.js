const TextGlossingHelper = require('../textGlossingHelper.js');
const textGlossingHelper = new TextGlossingHelper();

describe('Extract only Japanese characters', () => {
  test('Should remove all non-Japanese characters', () => {
    const noJapaneseStr = 'hello world';
    const japaneseStr =
      '一人立ち尽くす　星の見えない夜\n' +
      'STAND-ALONE\n' +
      '\n' +
      '(こんな小さな星座なのに...)';

    const japaneseStrOutput =
      '一人立ち尽くす星の見えない夜こんな小さな星座なのに';

    expect(textGlossingHelper.extractJapaneseStr('')).toEqual('');

    expect(textGlossingHelper.extractJapaneseStr(noJapaneseStr)).toEqual('');

    expect(textGlossingHelper.extractJapaneseStr(japaneseStr)).toEqual(japaneseStrOutput);
  });
});

describe('Preprocess text', () => {
  test('Should extract JP text from input text and break it' +
    'into chunks of <200', () => {
    const noJapaneseStr = 'hello world';
    const japaneseStr =
      '一人立ち尽くす　星の見えない夜\n' +
      'STAND-ALONE\n' +
      '\n' +
      '(こんな小さな星座なのに...)';
    const pureJapaneseStr = 'アイスクリームを食べるのがやめる';

    const japaneseStrOutput =
      ['一人立ち尽くす星の見えない夜\nこんな小さな星座なのに\n'];

    expect(textGlossingHelper.preprocessText('')).toEqual([]);

    expect(textGlossingHelper.preprocessText(noJapaneseStr)).toEqual([]);

    expect(textGlossingHelper.preprocessText(japaneseStr)).toEqual(japaneseStrOutput);

    expect(textGlossingHelper.preprocessText(pureJapaneseStr)).toEqual([pureJapaneseStr + '\n']);
  });
});
