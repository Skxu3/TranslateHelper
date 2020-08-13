const RomajiHelper = require('../romajiHelper.js');
const romajiHelper = new RomajiHelper();
const {closedExamples, openExamples, etcExamples} = require('./testConstants.js');
const config = {
  'outputFormat': 'hiragana',
  'capitalizeFirstLetter': true,
};

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
    const input = 'anata ha ana chan';
    const input2 = 'tsumetai heya de ichi nin';

    const output = 'anata wa ana-chan';
    const output2 = 'tsumetai heya de hitori';

    expect(romajiHelper.applyCommonFixes('')).toEqual('');

    expect(romajiHelper.applyCommonFixes(input)).toEqual(output);
    expect(romajiHelper.applyCommonFixes(output)).toEqual(output);

    expect(romajiHelper.applyCommonFixes(input2)).toEqual(output2);
    expect(romajiHelper.applyCommonFixes(output2)).toEqual(output2);
  });

  test.each(openExamples)('Open examples', (input) => {
    const output = romajiHelper.applyCommonFixes(input);
    expect(output.split(' ').length).toBeGreaterThanOrEqual(2);
  });

  test.each(closedExamples)('Closed examples', (input) => {
    const output = romajiHelper.applyCommonFixes(input);
    expect(output.split(' ')).toHaveLength(1);
  });

  test.each(etcExamples)('Etc examples', (input, expected) => {
    const output = romajiHelper.applyCommonFixes(input);
    expect(output).toEqual(expected);
  });
});

describe('End to end test', () => {
  beforeEach(async () => {
    await romajiHelper.initKuroshiro();
  });

  test.each(openExamples)('Open examples', async (input) => {
    const output = await romajiHelper.getRomaji(config, input);
    expect(output.length).toBeGreaterThanOrEqual(2);
  });

  test.each(closedExamples)('Closed examples', async (input) => {
    const output = await romajiHelper.getRomaji(config, input);
    expect(output).toHaveLength(1);
  });

  test.each(etcExamples)('Etc examples', async (input, expected) => {
    const output = await romajiHelper.getRomaji(config, input);
    expect(output).toEqual(expected);
  });
});

describe('Fixing spacing', () => {
  test('Should rid extra space near punctuations', () => {
    const input = 'Hey ( You let me down )\n';
    const input2 = 'Today ? Fuchi he ( Your time is up )\n';
    const input3 = 'I \' m happy!\n';
    const input4 = '\' nan dette soryaa \'';
    const input5 = '\' inochi ni kachi ga aru \' to shinjiteru';

    const output = 'Hey (You let me down)\n';
    const output2 = 'Today? Fuchi he (Your time is up)\n';
    const output3 = 'I\'m happy!\n';
    const output4 = '\'nan dette soryaa\'';
    const output5 = '\'inochi ni kachi ga aru\' to shinjiteru';

    expect(romajiHelper.fixSpacing(input)).toEqual(output);
    expect(romajiHelper.fixSpacing(output)).toEqual(output);

    expect(romajiHelper.fixSpacing(input2)).toEqual(output2);
    expect(romajiHelper.fixSpacing(output2)).toEqual(output2);

    expect(romajiHelper.fixSpacing(input3)).toEqual(output3);
    expect(romajiHelper.fixSpacing(output3)).toEqual(output3);

    expect(romajiHelper.fixSpacing(input4)).toEqual(output4);
    expect(romajiHelper.fixSpacing(output4)).toEqual(output4);

    expect(romajiHelper.fixSpacing(input5)).toEqual(output5);
    expect(romajiHelper.fixSpacing(output5)).toEqual(output5);
  });
});

describe('Preprocess text', () => {
  test('Should rid extra space near punctuations', () => {
    const input = '「命に価値がある」と信じてる';
    const input2 = '「人を殺してはいけない」と思ってる';
    const input3 = '“科学的に証明されたものは「真実」”';

    const output = '\"命に価値がある\"と信じてる';
    const output2 = '\"人を殺してはいけない\"と思ってる';
    const output3 = '\"科学的に証明されたものは\"真実\"\"';

    expect(romajiHelper.preprocessText(input)).toEqual(output);
    expect(romajiHelper.preprocessText(input2)).toEqual(output2);
    expect(romajiHelper.preprocessText(input3)).toEqual(output3);
    expect(romajiHelper.preprocessText(output)).toEqual(output);
    expect(romajiHelper.preprocessText(output2)).toEqual(output2);
    expect(romajiHelper.preprocessText(output3)).toEqual(output3);
  });
});
