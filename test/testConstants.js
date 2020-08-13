const fullSong =
  '重ねた夢の隙間彷徨う\n' +
  '今もまだ　今もまだ\n' +
  '揺らいだ現実全て捨てて\n' +
  'これはまだ　夢の中\n' +
  '\n' +
  '生ぬるい夜風と街並み\n' +
  '地下鉄に飲み込まれる\n' +
  '鳴り響く雑踏に溶けて\n' +
  '滲む合図　ネオンライツ\n' +
  '\n' +
  'さよならって　君が叫んでる\n' +
  'さよならって　今も叫んでる\n' +
  '間違いだらけでも　そのドアを開ければいいと\n' +
  '何も変われないなら\n' +
  '悲しい歌ずっと　歌ってもいいの\n' +
  '\n' +
  'STAND-ALONE　歪んだ世界で\n' +
  'STAND-ALONE　描いた世界へ\n' +
  'バイバイ　窓辺に　月明かりも届かない場所\n' +
  '何もかも投げ出して　暗闇に浮かぶ\n' +
  '星になりたい夜　そうでしょう\n' +
  '\n' +
  'ふらついた足元指先\n' +
  '目の前も　吐息すら\n' +
  '何もかも本当か嘘か\n' +
  '分からない　わかんない\n' +
  '\n' +
  '探していたはずの線を\n' +
  '失くしてきたもので描いて\n' +
  '曖昧過ぎたのは　始まりとルールの性能\n' +
  '何も守れないなら\n' +
  '刻んだ名前も　失くしてもいいよ\n' +
  '\n' +
  '最初に　君がついた嘘\n' +
  '夜明けは来るよと囁き\n' +
  '泣きたい　ほど　あの時間こそが幸せだった\n' +
  '星座すら逃げ出して\n' +
  '一人立ち尽くす　星の見えない夜\n' +
  'STAND-ALONE\n' +
  '\n' +
  '(こんな小さな星座なのに...)\n' +
  '\n' +
  'さよならって　君が叫んでる\n' +
  'さよならって　今も叫んでる\n' +
  '間違いだらけでも　そのドアを叩けばいいと\n' +
  '何も変われなくても\n' +
  '悲しい歌ずっと　歌ってもいいと\n' +
  '\n' +
  'STAND-ALONE　歪んだ世界で\n' +
  'STAND-ALONE　描いた世界へ\n' +
  'バイバイ　窓辺に　月明かりも届かない場所\n' +
  '何もかも投げ出して　暗闇に浮かぶ\n' +
  '星になりたい夜　そうでしょう';

const alphaPunctuation =
  '最初に　君がついた嘘\n' +
  '夜明けは来るよと囁き\n' +
  '泣きたい　ほど　あの時間こそが幸せだった\n' +
  '星座すら逃げ出して\n' +
  '一人立ち尽くす　星の見えない夜\n' +
  'STAND-ALONE\n' +
  '\n' +
  '(こんな小さな星座なのに...)\n';

const chorus =
  'さよならって　君が叫んでる\n' +
  'さよならって　今も叫んでる\n' +
  '間違いだらけでも　そのドアを開ければいいと\n' +
  '何も変われないなら\n' +
  '悲しい歌ずっと　歌ってもいいの\n' +
  '\n' +
  'STAND-ALONE　歪んだ世界で\n' +
  'STAND-ALONE　描いた世界へ\n' +
  'バイバイ　窓辺に　月明かりも届かない場所\n' +
  '何もかも投げ出して　暗闇に浮かぶ\n' +
  '星になりたい夜　そうでしょう\n' +
  '\n' +
  'さよならって　君が叫んでる\n' +
  'さよならって　今も叫んでる\n' +
  '間違いだらけでも　そのドアを叩けばいいと\n' +
  '何も変われなくても\n' +
  '悲しい歌ずっと　歌ってもいいと\n' +
  '\n' +
  'STAND-ALONE　歪んだ世界で\n' +
  'STAND-ALONE　描いた世界へ\n' +
  'バイバイ　窓辺に　月明かりも届かない場所\n' +
  '何もかも投げ出して　暗闇に浮かぶ\n' +
  '星になりたい夜　そうでしょう';

// const closedExamples = [
//   // te:
//   ['食べても', '食べている', '食べてる', '食べてた', '食べてく', '泳いで', '結んで'],
//   // suffix:
//   ['熱くない', '現実的'],
//     // prefix:
//   ['無関係'],
//     // interrogative:
//   ['いつか', 'いつも', 'いつでも', 'いつだって'],
//   // etc
//   ['食べたり'],
// ];
//
// const openExamples = [
//   // te form
//   [
//   '食べてしまう',
//   '食べていく',
//   '食べてくる',
//   '食べてある',
//   '食べてみる',
//   '食べてみせる',
//   '食べておく',
//   '読んで忘れて',
//   ],
//   // suffix:
//   [
//     '熱くなる',
//     '話し続ける',
//     '食べ過ぎる',
//     '住みなれる',
//     '食べ始める',
//     '私たち',
//     '思い通り',
//     '思った通り',
//     '間違いだらけ',
//     '何事',
//     '見ながら',
//     '食べやすい',
//     '食べにくい',
//     '食べ切れる',
//     '食べ過ごす',
//     '食べ飽きた',
//     '食べづつ'],
//   // interrogative:
//   ['いつしか', 'いつまでも', 'いつのまにか', 'いつにしか']
// ];
//
// const etcExamples = [
//   ['大きな', 'ookina'],
//   ['小さな', 'chiisana'],
//   ['としても', 'to shitemo'],
//   ['知らず知らず', 'shirazushirazu'],
//   ['しょうがない', 'shou ga nai'],
// ];

const closedExamples = [
  // te:
  ['tabe te mo', 'tabe te iru', 'tabe teru', 'tabe te ta', 'tabe te ku', 'oyoi de', 'musun de'],
  // suffix:
  ['atsuku nai', 'genjitsu teki'],
  // prefix:
  ['mukankei'],
  // interrogative:
  ['itsuka', 'itsumo', 'itsu demo', 'itsu datte'],
  // etc
  ['tabe tari'],
];

const openExamples = [
  // te form
  ['tabe te shimau', 'tabe te iku', 'tabe te kuru', 'tabe te aru', 'tabe te miru',
    'tabe te miseru', 'tabe te oku', 'yon de wasure te'],
  // suffix:
  [
    'atsuku naru',
    'hanashi tsuzukeru',
    'tabe sugiru',
    'sumi nareru',
    'tabe hajimeru',
    'watashi tachi',
    'omoidoori',
    'omotta toori',
    'machigai darake',
    'nanigoto',
    'mi nagara',
    'tabe yasui',
    'tabe nikui',
    'tabe kireru',
    'tabe sugosu',
    'tabe aki ta',
    'tabe zutsu'],
  // interrogative:
  ['itsushika', 'itsu made mo', 'itsunomanika', 'itsu ni shika'],
];

const etcExamples = [
  ['ookina', 'ookina'],
  ['chiisana', 'chiisana'],
  ['toshite mo', 'to shitemo'],
  ['shirazu shirazu', 'shirazushirazu'],
  ['shouga nai', 'shou ganai'],
];

module.exports = {
  alphaPunctuation,
  chorus,
  fullSong,
  closedExamples,
  openExamples,
  etcExamples,
};
