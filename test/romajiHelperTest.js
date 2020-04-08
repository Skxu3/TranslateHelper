const RomajiHelper = require('../romajiHelper.js');
const romajiHelper = new RomajiHelper();

describe('Fix capitalization', () => {
  test('Should capitalize start of each line', () => {
    const input = 'hello world';
    const output = 'Hello world';

    expect(romajiHelper.fixCapitalization('')).toEqual('');

    expect(romajiHelper.fixCapitalization(input)).toEqual(output);
    expect(romajiHelper.fixCapitalization(output)).toEqual(output);
  });

  test('Should capitalize letter after sentence end or tab.', () => {
    const sentence_end_input = 'hello world. hello';
    const multiple_sentence_end_input = 'hello world. hello! how?';
    const tab_input = 'hello world\thello';
    const multiple_tab_input = 'hello\t world\t\t\thello';

    const sentence_end_output = 'Hello world. Hello';
    const multiple_sentence_end_output = 'Hello world. Hello! How?';
    const tab_output = 'Hello world\tHello';
    const multiple_tab_output = 'Hello\t World\t\t\tHello';

    expect(romajiHelper.fixCapitalization(sentence_end_input)).toEqual(sentence_end_output);
    expect(romajiHelper.fixCapitalization(sentence_end_output)).toEqual(sentence_end_output);

    expect(romajiHelper.fixCapitalization(multiple_sentence_end_input)).toEqual(multiple_sentence_end_output);
    expect(romajiHelper.fixCapitalization(multiple_sentence_end_output)).toEqual(multiple_sentence_end_output);

    expect(romajiHelper.fixCapitalization(tab_input)).toEqual(tab_output);
    expect(romajiHelper.fixCapitalization(tab_output)).toEqual(tab_output);

    expect(romajiHelper.fixCapitalization(multiple_tab_input)).toEqual(multiple_tab_output);
    expect(romajiHelper.fixCapitalization(multiple_tab_output)).toEqual(multiple_tab_output);
  });
});

describe('Apply common fixes', () => {
  test('Should replace common style inconsistency', () => {
    const input = 'anata ha doko e ikimasu ka';
    const input2 = 'tsumetai heya de ichi nin';

    const output = 'anata wa doko he ikimasu ka';
    const output2 = 'tsumetai heya de hitori';

    expect(romajiHelper.applyCommonFixes('')).toEqual('');

    expect(romajiHelper.applyCommonFixes(input)).toEqual(output);

    expect(romajiHelper.fixCapitalization(input2)).toEqual(output2);
  });
});
