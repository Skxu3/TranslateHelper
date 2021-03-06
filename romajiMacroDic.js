const macroDic = {
  '‘':	'\'',
  '’':	'\'',
  '\！':	'!',
  '\？':	'?',
  '×':	'batsu',
  '1 gatsu':	'ichigatsu',
  '10 gatsu':	'juugatsu',
  '100 ho':	'hyappo',
  '11 gatsu':	'juuichigatsu',
  '12 gatsu':	'juunigatsu',
  '2 gatsu':	'nigatsu',
  '3 gatsu':	'sangatsu',
  '4 gatsu':	'shigatsu',
  '5 gatsu':	'gogatsu',
  '6 gatsu':	'rokugatsu',
  '7 gatsu':	'shichigatsu',
  '8 gatsu':	'hachigatsu',
  '9 gatsu':	'kugatsu',
  'ai kawararazu':	'aikawarazu',
  'ai kotoba':	'aikotoba',
  'aida no nuketa':	'ma no nuketa',
  'amei':	'amae',
  'an rimiteddo':	'anrimiteddo',
  'anya':	'yamiyo',
  'ari ge':	'arige',
  'arinomama':	'ari no mama',
  'arudaro':	'aru daro',
  'asu':	'ashita',
  'atari mae':	'atarimae',
  'atemo naku':	'ate mo naku',
  'atto yuu ma ni':	'a tto iu ma ni',
  'bei bei':	'beibee',
  'bokutou':	'bokura',
  'bureiku':	'bureeku',
  'chichisan':	'tou-san',
  'chokoreito':	'chokoreeto',
  'chomeinin':	'chomeijin',
  'da kara':	'dakara',
  'da kedo':	'dakedo',
  'daijoubusa':	'daijoubu sa',
  'dare ka':	'dareka',
  'dare mo':	'daremo',
  'dare shimo':	'dareshimo',
  'de mo':	'demo',
  'doko demo':	'dokodemo',
  'doko ka':	'dokoka',
  'don nani':	'donna ni',
  'donnani':	'donna ni',
  'dou shite':	'doushite',
  'douhyou':	'michishirube',
  'douri':	'doori',
  'e soragoto':	'esoragoto',
  'eiru':	'eeru',
  'emoushon':	'emooshon',
  'ende':	'fuchi de',
  'epirougu':	'epiroogu',
  'era sou':	'erasou',
  'esukeipu':	'esukeepu',
  'fou iu':	'foo yuu',
  'fu antei':	'fuantei',
  'fu jiyuu':	'fujiyuu',
  'fu jouri':	'fujouri',
  'fu kakujitsu':	'fukakujitsu',
  'fu kanou':	'fukanou',
  'fu kintou':	'fukintou',
  'fu kiyou':	'bukiyou',
  'fu meiryou':	'fumeiryou',
  'fu meiyo':	'fumeiyo',
  'fu shizen':	'fushizen',
  'fukiyou':	'bukiyou',
  'fumides':	'fumidas',
  'furei':	'furee',
  'fureizu':	'fureezu',
  'ganai':	'ga nai',
  'ganai':	'ga nai',
  'gawa de':	'soba de',
  'gawa ni imas':	'soba ni imas',
  'gawa ni iru':	'soba ni iru',
  'gawa ni ite':	'soba ni ite',
  'gawa ni itt':	'soba ni itt',
  'gawa ni':	'soba ni',
  'geimu':	'geemu',
  'geito':	'geeto',
  'getsuyou hi':	'getsuyoubi',
  'go gatsu':	'gogatsu',
  'go kentou':	'gokentou',
  'go sen fu':	'gosenfu',
  'gouru':	'gooru',
  'ha':	'wa',
  'hachi gatsu':	'hachigatsu',
  'hahasan':	'kaa-san',
  'hakike':	'hakige',
  'harou':	'haroo',
  'hashirides':	'hashiridas',
  'hashiridesereba':	'hashiridasereba',
  'hashirideseru':	'hashiridaseru',
  'hashiridesu':	'hashiridasu',
  'hazusa':	'hazu sa',
  'he':	'e',
  'hi nichirou':	'hinichijou',
  'hidarite':	'hidari te',
  'hikou ki kumo':	'hikoukigumo',
  'hitodouri':	'hitodoori',
  'hitoriaruki daser':	'hitori arukidaser',
  'hodotoui':	'hodotooi',
  'honou':	'honoo',
  'hontouha':	'hontou wa',
  'houki hoshi':	'houkiboshi',
  'houmotsu':	'takaramono',
  'houmu':	'hoomu',
  'hyaku nen':	'hyakunen',
  'hyou':	'omote',
  'i basho':	'ibasho',
  'I m':	'I’m',
  'i nai':	'inai',
  'i naku':	'inaku',
  'ichi bai':	'ippai',
  'ichi chokusen':	'icchokusen',
  'ichi do':	'ichido',
  'ichi fukuro':	'hitofukuro',
  'ichi gatsu':	'ichigatsu',
  'ichi ho':	'ippo',
  'ichi kai':	'ikkai',
  'ichi ki':	'ikki',
  'ichi omoi':	'hitoomoi',
  'ichi shuu':	'isshuu',
  'ichi shuukan':	'isshuukan',
  'ichi sun':	'issun',
  'ii ka i':	'ii kai',
  'ii nari':	'iinari',
  'iji aku':	'ijiwaru',
  'iku do':	'ikudo',
  'iku sen':	'ikusen',
  'ikutsu mo no':	'ikutsumo no',
  'ikutsu mo':	'ikutsumo',
  'imeiji':	'imeeji',
  'imiteishon':	'imiteeshon',
  'imiteishon':	'imiteeshon',
  'inaku tatte':	'inakutatte',
  'insutouru':	'insutooru',
  'iroase tari':	'iroasetari',
  'isshunde':	'isshun de',
  'itoushi':	'itooshi',
  'itsu demo':	'itsudemo',
  'itsu ka':	'itsuka',
  'itsu mo':	'itsumo',
  'itsu no aida ni':	'itsu no ma ni',
  'itsumo toori':	'itsumo doori',
  'ittsu mo':	'ittsumo',
  'iwa kan':	'iwakan',
  'iya gar':	'iyagar',
  'ja nai':	'janai',
  'ja naku':	'janaku',
  'janaku te':	'janakute',
  'ji':	'toki',
  'jikan kire':	'jikan gire',
  'juu gatsu':	'juugatsu',
  'juu hou':	'juppo',
  'juu roku':	'juuroku',
  'juuichi gatsu':	'juuichigatsu',
  'juuni gatsu':	'juunigatsu',
  'ka dou kamo':	'ka dou ka mo',
  'ka i':	'kai',
  'ka mo':	'kamo',
  'kaaten kouru':	'kaaten kooru',
  'kaben':	'hanabira',
  'kage houshi':	'kageboushi',
  'kan ni i':	'mi ni i',
  'kana':	'ka na',
  'kansei tou':	'kanseitou',
  'karadachuu':	'karadajuu',
  'kari hajimete':	'karisome',
  'katawara':	'soba',
  'keppen':	'kakera',
  'ki ni hairan':	'ki ni iran',
  'kirei koto':	'kireigoto',
  'kireji':	'kireigoto',
  'koku mou':	'kizamou',
  'kon':	'ima',
  'konoyo':	'kono yo',
  'kontorouru':	'kontorooru',
  'kou kiatsu':	'koukiatsu',
  'kouhii':	'koohii',
  'kouri':	'koori',
  'kouritsuku':	'kooritsuku',
  'kouru':	'kooru',
  'kousa ten':	'kousaten',
  'ku gatsu':	'kugatsu',
  'kun':	'kimi',
  'kun':	'kimi',
  'kureyuku':	'kure yuku',
  'kuroubaa':	'kuroobaa',
  'kyuu gatsu':	'kugatsu',
  'ma yonaka':	'mayonaka',
  'machidoushii':	'machidooshi',
  'mana kotoba':	'aikotoba',
  'maniawanai':	'ma ni awanai',
  'meinin':	'meijin',
  'meiru':	'meeru',
  'mende':	'tsura de',
  'mi kansei':	'mikansei',
  'mi ta':	'mita',
  'mi tai':	'mitai',
  'mi te':	'mite',
  'migi te':	'migite',
  'migite':	'migi te',
  'mikka tsuki':	'mikazuku',
  'mitesou':	'mite sou',
  'monde mo':	'mon demo',
  'mono kuromu':	'monokuromu',
  'monorougu':	'monoroogu',
  'moshi mo':	'moshimo',
  'moudo':	'moodo',
  'mu aiso':	'buaisou',
  'mu imi':	'muimi',
  'mu ishiki':	'muishiki',
  'mu jaki':	'mujaki',
  'mugen dai':	'mugendai',
  'mushi tsuba':	'mushizu',
  'naku tatte':	'nakutatte',
  'nan demo':	'nandemo',
  'nan do mo':	'nando mo',
  'nan do':	'nando',
  'nan dome':	'nandome',
  'nan ga':	'nani ga',
  'nan hitotsu':	'nani hitotsu',
  'nan hyaku':	'nanbyaku',
  'nan kai':	'nankai',
  'nan mo':	'nanimo',
  'nan o':	'nani o',
  'nan oku':	'nanoku',
  'nan te':	'nante',
  'nan wo':	'nani wo',
  'nan yori':	'nani yori',
  'nana gatsu':	'shichigatsu',
  'nanbyaku kai':	'nanbyakkai',
  'nandomo':	'nando mo',
  'nange':	'nanige',
  'nangenai':	'nanigenai',
  'nani ka':	'nanika',
  'nani mo':	'nanimo',
  'naniga':	'nani ga',
  'nanimo ka mo':	'nanimokamo',
  'nankanai':	'nanka nai',
  'nanni mo':	'nannimo',
  'nantenai':	'nante nai',
  'nara ba':	'naraba',
  'nei':	'nee',
  'nei':	'nee',
  'neikun':	'nee kimi',
  'ni do':	'nido',
  'ni gatsu':	'nigatsu',
  'ni ki':	'nikki',
  'ni nin':	'futari',
  'nitotte':	'ni totte',
  'nohitori':	'no hitori',
  'noni':	'no ni',
  'nou miso':	'noumiso',
  'nouto':	'nooto',
  'nusumikiku':	'nusumigiku',
  'o bentou':	'obentou',
  'o cha':	'ocha',
  'o chichisan':	'otou-san',
  'o hahasan':	'o hahasan',
  'o hisa':	'ohisa',
  'o ide':	'oide',
  'o ideyo':	'oide yo',
  'o inori':	'oinori',
  'o kane':	'okane',
  'o kazu':	'okazu',
  'o ki ni iri':	'oki ni iri',
  'o kyakusan':	'okyakusan',
  'o majinai':	'omajinai',
  'o nayami':	'onayami',
  'o negai':	'onegai',
  'o sakana':	'osakana',
  'o saraba':	'osaraba',
  'o shigoto':	'oshigoto',
  'o shimai':	'oshimai',
  'o shirase':	'oshirase',
  'o soroi':	'osoroi',
  'o tagai':	'otagai',
  'o tsukisa':	'otsukisa',
  'o yasumi':	'oyasumi',
  'o':	'wo',
  'okonattari ki tari':	'ittari kitari',
  'omou sama':	'omou yo',
  'oubaa':	'oobaa',
  'ougesa':	'oogesa',
  'ougoe':	'oogoe',
  'oukesutora':	'ookesutora',
  'ouki':	'ooki',
  'ouku':	'ooku',
  'ouru':	'ooru',
  'ousugi':	'oosugi',
  'ouzora':	'oozora',
  'parameita':	'parameeta',
  'parameita':	'parameeta',
  'peiji':	'peeji',
  'peisu':	'peesu',
  'puraisu resu':	'puraisuresu',
  'purorougu':	'purorougu',
  'ran hansha':	'ranhansha',
  'rashin ban':	'rashinban',
  'reisu':	'reesu',
  'rekoudo':	'rekoodo',
  'rettou kan':	'rettoukan',
  'rettsu gou':	'rettsu goo',
  'risou gou':	'risoukyou',
  'roji ura':	'rojiura',
  'roku gatsu':	'rokugatsu',
  'rokuni':	'roku ni',
  'roudo':	'roodo',
  'rouru':	'rooru',
  'san gatsu':	'sangatsu',
  'san hyaku':	'sanbyaku',
  'san kai':	'sankai',
  'san ki':	'sanki',
  'san nin':	'sannin',
  'sanrou':	'mairou',
  'sayou nara':	'sayounara',
  'sei ippai':	'seiippai',
  'sekentai':	'sekentei',
  'sen kire':	'chigire',
  'sen nen':	'sennen',
  'sendatte':	'saki datte',
  'sende':	'sen de',
  'shi ka':	'shika',
  'shi nai':	'shinai',
  'shi nakereba':	'shinakereba',
  'shi nakya':	'shinakya',
  'shi tatte':	'shitatte',
  'shibatataku':	'matataku',
  'shibatatateiru':	'mabataiteiru',
  'shichi gatsu':	'shichigatsu',
  'shin genjitsu':	'shingenjitsu',
  'shin kokyuu':	'shinkokyuu',
  'shin ni uke':	'ma ni uke',
  'shinaku tatte':	'shinakutatte',
  'shinki rou':	'shinkirou',
  'shintai':	'karada',
  'shintaichuu':	'karadajuu',
  'shite ite mo':	'shiteitemo',
  'shitsu kusa':	'nakusa',
  'shitsu kushi':	'nakushi',
  'shitsu kusu':	'nakusu',
  'shu wo':	'te wo',
  'shu':	'tane',
  'souda':	'sooda',
  'sougousan':	'aiaigasa',
  'souru':	'sooru',
  'sudeni':	'sude ni',
  'sue naga':	'suenaga',
  'sugi sa':	'sugisa',
  'sugu gawa':	'subu soba',
  'sukitouru':	'sukitooru',
  'sukunaku tomo':	'sukunakutomo',
  'suna tokei':	'sunadokei',
  'supeisu':	'supeesu',
  'suteiji':	'suteeji',
  'sutourii':	'sutoorii',
  'ta no':	'hoka no',
  'ta wo':	'hoka wo',
  'taichuu':	'karadajuu',
  'tamani':	'tama ni',
  'tattahitori':	'tatta hitori',
  'tattahitotsu':	'tatta hitotsu',
  'tayorinai':	'tayori nai',
  'te kagen':	'tekagen',
  'tenei':	'tenee',
  'tenjou tenka':	'tenjou tenge',
  'tokei dai':	'tokeidai',
  'toki ishiki':	'jiishiki',
  'tokui ki':	'tokuige',
  'toori':	'doori',
  'touhi gyou':	'touhikou',
  'toui':	'tooi',
  'touka':	'tomoshibi',
  'touki':	'tooki',
  'touku':	'tooku',
  'toumawar':	'toomawar',
  'touri':	'toori',
  'tourikos':	'toorikos',
  'tourinukeru':	'toorinukeru',
  'tourisugi':	'toorisugi',
  'touru':	'tooru',
  'touzak':	'toozak',
  'tsuini':	'tsui ni',
  'tsukan da':	'tsukanda',
  'tsumazui tatte':	'tsumazuitatte',
  'TV':	'terebi',
  'ugokidesu':	'ugokidasu',
  'uragirisha':	'uragirimono',
  'wahitori':	'wa hitori',
  'wanai':	'wa nai',
  'wanai':	'wa nai',
  'yakkaisha':	'yakkaimono',
  'yashi nai':	'ya shinai',
  'yatsutou':	'yatsura',
  'yoi n':	'iin',
  'yoi':	'ii',
  'yon gatsu':	'shigatsu',
  'yononaka':	'yo no naka',
  'yosoutta':	'yosootta',
  'you idonde':	'yooi don de',
  'yousuru':	'you suru',
  'yukiba':	'ikiba',
  'yukinoshita':	'yuki no shita',
  'yume monogatari':	'yumemonogatari',
  'yuruginai':	'yurugi nai',
  'yuu':	'iu',
  'yuuen chi':	'yuuenchi',
  'yuugure toki':	'yuuguuredoki',
  '○':	'maru',
  '1 nin':	'hitori',
  '10nen':	'juunen',
  '1hatsu':	'ippatsu',
  '1hen':	'ippen',
  '1nin':	'hitori',
  '1tsu':	'hitotsu',
  '2 nin':	'futari',
  '2hatsu':	'nippatsu',
  '2nin':	'futari',
  '2tsu':	'futatsu',
  '3 nin':	'sannin',
  '3hatsu':	'sanbatsu',
  '3nin':	'sannin',
  '3tsu':	'mitsu',
  '4tsu':	'yotsu',
  'ā':	'aa',
  'a nai':	'anai',
  'a zu ni':	'azu ni',
  'a zu':	'azu',
  'atataka sa':	'atatakasa',
  'betsuni':	'betsu ni',
  'boku ra':	'bokura',
  'boku tachi':	'bokutachi',
  'bunki tende':	'bunkiten de',
  'chotto zutsu':	'chottozutsu',
  'dai butai':	'dai butai',
  'deki nai':	'dekinai',
  'du':	'dzu',
  'ē':	'ee',
  'e ba':	'eba',
  'e nai':	'enai',
  'e nu':	'enu',
  'e sou':	'esou',
  'e ta':	'eta',
  'e tai':	'etai',
  'e tara':	'etara',
  'e te':	'ete',
  'e zu ni':	'ezu ni',
  'e zu':	'ezu',
  'e zu':	'ezu',
  'enka unto':	'enkaunto',
  'futaride':	'futari de',
  'futsutsu':	'futatsu',
  'garasu saiku':	'garasuzaiku',
  'heikisa':	'heiki sa',
  'hito-hira':	'hitohira',
  'hitori kiri':	'hitorikiri',
  'hitoride':	'hitori de',
  'hoshiku te':	'hoshikute',
  'ī':	'ii',
  'i nagara':	'inagara',
  'i sobire':	'isobire',
  'i sou':	'isou',
  'i sugi':	'isugi',
  'i ta':	'ita',
  'i tai':	'itai',
  'i takatta':	'itakatta',
  'i taku nai':	'itakunai',
  'i tara':	'itara',
  'i tari':	'itari',
  'i te':	'ite',
  'i teiru':	'ite iru',
  'i temo':	'itemo',
  'ichi nichi chuu':	'ichinichijuu',
  'ichi nin':	'hitori',
  'ichi-ko':	'ikko',
  'ichihen':	'ippen',
  'idarou':	'i darou',
  'ie nai':	'ienai',
  'iji waru':	'ijiwaru',
  'ippo zutsu':	'ippozutsu',
  'itsu da tte':	'itsudatte',
  'itsu datte':	'itsudatte',
  'itsu shi ka':	'itsu shika',
  'itsuzuk':	'i tsuzuk',
  'jibunde':	'jibun de',
  'juu nen':	'juunen',
  'kesshou tai':	'kesshoutai',
  'kinen hi':	'kinenbi',
  'kke':	'kke',
  'kodomo tachi':	'kodomotachi',
  'koeawase':	'koe awase',
  'kon da':	'konda',
  'ku nai':	'kunai',
  'ku naku te':	'kunakute',
  'ku te mo':	'kutemo',
  'ku te':	'kute',
  'ku temo':	'kutemo',
  'ku tomo':	'kutomo',
  'ku':	'ku',
  'kubeki':	'ku beki',
  'kyoukai sen':	'kyoukaisen',
  'machi nami':	'machinami',
  'minnade':	'minna de',
  'mu ji hi':	'mujihi',
  'myougonichi':	'asatte',
  'n de':	'nde',
  'n':	'n',
  'na\?':	'naa',
  'nai de':	'nai de',
  'nainara':	'nai nara',
  'nakami dou':	'namikimichi',
  'naku natte':	'naku natte',
  'naku te':	'nakute',
  'naku temo':	'nakutemo',
  'nakute mo':	'nakutemo',
  'nan mo ka mo':	'nanimokamo',
  'nana henka':	'shichihenge',
  'nankanain da':	'nanka nain da',
  'nantenai':	'nante nai',
  'ne\?':	'nee',
  'nettai sakana':	'nettaigyou',
  'nettai yoru':	'nettaiya',
  'ō':	'ou',
  'o u':	'ou',
  'omoi toori':	'omoidoori',
  'onnanoko':	'onna no ko',
  'otokonoko':	'otoko no ko',
  'otona tachi':	'otonatachi',
  'raden saiku':	'radenzaiku',
  'rarenai':	'rarenai',
  'rareru':	'rareru',
  'rubeki':	'ru beki',
  'rudaro':	'rudaro',
  'rudarou':	'rudarou',
  'saikousa':	'saikou sa',
  'sekai chuu':	'sekaijuu',
  'sekai hite':	'sekaiichi',
  'sekai hito':	'sekaiichi',
  'sekaichuu':	'sekaijuu',
  'senaka koshi':	'senakagoshi',
  'shi sou':	'shisou',
  'shi tai':	'shitai',
  'shi tain':	'shitain',
  'shikanai':	'shika nai',
  'shinrya ku':	'shinryaku',
  'shinrya kusha':	'shinryakusha',
  'shishun ki':	'shishunki',
  'shoudarake':	'kizu darake',
  'shunpuu':	'harukaze',
  'sore to mo':	'soretomo',
  'su beki':	'subeki',
  'sukoshi zutsu':	'sukoshizutsu',
  'tadarou':	'ta darou',
  'taku nai':	'takunai',
  'taku te':	'takute',
  'taku te':	'takute',
  'tari nai':	'tarinai',
  'te i ta':	'teita',
  'te iru':	'teiru',
  'te iru':	'teiru',
  'te ita':	'teita',
  'te ita':	'teita',
  'te ite':	'teite',
  'te mo':	'temo',
  'teiu':	'te iu',
  'toiu':	'to iu',
  'tomoni':	'tomo ni',
  'totomoni':	'to tomo ni',
  'tsuitachi':	'ichinichi',
  'tsuyogaride':	'tsuyogari de',
  'tte iru':	'tteiru',
  'tteiu':	'tte iu',
  'ū':	'uu',
  'udarou':	'u darou',
  'unara':	'u nara',
  'wakan nai':	'wakannai',
  'watakushi':	'watashi',
  'watashi tachi':	'watashitachi',
  'yaroujanai':	'yarou janai',
  'yobou sen':	'yobousen',
  'yon no go no':	'shi no go no',
};

module.exports = {
  macroDic,
};
