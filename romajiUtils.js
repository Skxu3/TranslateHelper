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
};

const simpleChangeWords = {
  // particles
  'o': 'wo',
  'ha': 'wa',
  'he': 'e',
};

/** Dictionary of complex changes to apply to raw romaji output from kuroshiro. */
const complexChangeDic = {
  // counters
  'ichi nin': 'hitori',
  'ni nin': 'futari',

  'ichi sai': 'issai',
  'hachi sai': 'hassai',
  'juu sai': 'juussai',
  'ni juu sai': 'hatachi',

  'ichi hon': 'ippon',
  'san hon': 'sanbon',
  'roku hon': 'roppon',
  'hachi hon': 'happon',
  'juu hon': 'juuppon',
  'nan hon': 'nanbon',

  'ichi hai': 'ippai',
  'san hai': 'sanbai',
  'roku hai': 'roppai',
  'hachi hai': 'happai',
  'juu hai': 'juuppai',
  'nani hai': 'nanbai',

  'ichi satsu': 'issatsu', // books
  'juu satsu': 'juussatsu',

  'ichi chaku': 'icchaku', // clothes
  'juu chaku': 'juucchaku',

  'ichi ko': 'ikko', // small things
  'roku ko': 'rokko',
  'hachi ko': 'hakko',
  'juu ko': 'juukko',

  'ichi kai': 'ikkai',
  'san kai': 'sangai',
  'roku kai': 'rokkai',
  'hachi kai': 'hakkai',
  'juu kai': 'juukkai',
  'nan kai': 'nangai', // optional

  // to be further updated

  'ichi kai': 'ikkai',
  'roku kai': 'rokkai',
  'hachi kai': 'hakkai',
  'juu kai': 'juukkai',

  'ichi fun': 'ippun',
  'san fun': 'sanpun',
  'yon fun': 'yonpun',
  'roku fun': 'roppun',
  'hachi fun': 'happun',
  'juu fun': 'juuppun',
  'nanibun': 'nanpun',

  'shouga nai': 'shou ganai',
  'shirazu shirazu': 'shirazushirazu',
  'toshite mo': 'to shitemo',
  'itsunomanika': 'itsu no mani ka',
  'da kara': 'dakara',
  'tomoni': 'tomo ni',
  'yashi': 'ya shi',
  'mouichido': 'mou ichido',
  // 'you na': 'youna',
  // 'you ni': 'youni',
};

// Wouldn't be by themselves.
const counters = ['ji', 'bu', 'fun', 'dai', 'hai', 'hiki', 'kai', 'mai', 'nin', 'chaku', 'satsu', 'tsu'];

/** Dictionary of changes to apply to raw romaji output from kuroshiro. */
const toMerge = [
  'u', 'n',
  'ba', 'sa', 'ta', 'te', 'ze', 'zu',
  'kou', 'sha', 'tte', 'nai', 'tai', 'kan', 'cha',
  'kiri', 'kkiri', 'kata', 'gata',
  'tara', 'tari', 'teru', 'teki', 'reru',
  'dara', 'dari', 'deru', 'reta', 'rete',
  'rareru', 'rete', 'seru',
];

const hyphenMerge = ['chan', 'sama'];

const postMerge = [
  'takunai', 'takute', 'rareta', 'keshite', 'nakute', 'sete', 'seru', 'senai', 'rete',
];

// If previous word end with value and second word is key, then merge.
const conditionalPostMerge = {
  'na': ['n', 'ka'],
  'ni': 'n',
  'nu': 'n',
  'ne': 'n',
  'no': 'n',
  'da': ['i'],
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
