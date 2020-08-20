const preprocessDic = {
  // '照る': 'teru',
  // '出る': 'deru',
};

/** Dictionary of simple changes to apply to raw romaji output from kuroshiro. */
const simpleChangeChars = {
  '‘': '\'',
  '’': '\'',
  '’': '\'',
  '/': '\.',
  '“': '"',
  '”': '"',

  // double width
  '＂': '"',
  '\？': '?',
  '\！': '!',
  '（': '(',
  '）': ')',
  '、': ',',
  '。': '.',
  '「': '"',
  '」': '"',
  '『': '"',
  '』': '"',
  '君': 'kimi',
  '×': 'batsu',
  // 'って': 'tte',
  // 'った': 'tta',
};

const simpleChangeWords = {
  // particles
  'o': 'wo',
  'ha': 'wa',
  'he': 'e',
};

/** Dictionary of complex changes to apply to raw romaji output from kuroshiro. */
const complexChangeDic = {
  'ichi nin': 'hitori',
  'ichi kai': 'ikkai',
  'ichi hai': 'ippai',
  'ichi hon': 'ippon',
  'ichi satsu': 'issatsu',
  'shouga nai': 'shou ganai',
  'shirazu shirazu': 'shirazushirazu',
  'toshite mo': 'to shitemo',
  'itsunomanika': 'itsu no mani ka',
  'da kara': 'dakara',
  'tomoni': 'tomo ni',
  'yashi': 'ya shi',
  // 'you na': 'youna',
  // 'you ni': 'youni',
};

// Wouldn't be by themselves.
const counters = ['bu', 'dai', 'hai', 'hiki', 'kai', 'mai', 'nin', 'satsu', 'tsu'];

/** Dictionary of changes to apply to raw romaji output from kuroshiro. */
const toMerge = [
  'u', 'n',
  'ba', 'sa', 'ta', 'te', 'ze', 'zu',
  'kou', 'sha', 'tte', 'nai', 'tai', 'kan', 'kiri', 'kkiri', 'kata', 'gata',
  'tara', 'tari', 'teru', 'teki', 'reru',
  'dara', 'dari', 'deru', 'reta', 'rete',
  'rareru', ,
];

const hyphenMerge = ['chan', 'sama'];

const postMerge = [
  'takunai', 'takute', 'rareta', 'keshite', 'nakute', 'sete', 'seru', 'senai',
];

// If previous word end with value and second word is key, then merge.
const conditionalPostMerge = {
  'na': 'n',
  'ni': 'n',
  'nu': 'n',
  'ne': 'n',
  'no': 'n',
  'de': ['n', 'i'],
  'desu': 'n',
  'mo': ['te'], // 'de'],
  'iru': ['te', 'de'],
  'ita': ['te', 'de'],
  'ku': ['te', 'de'],
  'kedo': 'da',
};

const interrogative = {
  words: [
    'itsu',
    'doko',
    'dare',
    'dore',
    'ikura',
    'ikutsu',
    'nan',
    'nani',
  ],
  closed: ['ka', 'mo', 'demo', 'datte'],
  open: ['shika', 'made', 'no', 'ni', 'goto'],
};

const split = ['doori'];

module.exports = {
  preprocessDic,
  simpleChangeChars,
  simpleChangeWords,
  complexChangeDic,
  counters,
  toMerge,
  hyphenMerge,
  postMerge,
  conditionalPostMerge,
  split,
  interrogative,
};
