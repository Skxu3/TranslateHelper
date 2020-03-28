// function processText(e) {
//   console.log(e);
// }


// function getTextGlossing(codeText) {
//   var url = "http://nihongo.monash.edu/cgi-bin/wwwjdic?9ZIG" + codeText;
//   $.ajax({
//     headers: { "Accept": "application/json"},
//      type: 'GET',
//      crossDomain: true,
//      url: "http://nihongo.monash.edu/cgi-bin/wwwjdic?9ZIG" + codeText,
//       beforeSend: function(xhr){
//         xhr.withCredentials = true;
//       },
//      success: function(jsondata){
//       console.log(jsondata);
//       document.getElementById("text-glossing").innerHTML = jsondata;
//      }
//   });
// }



// function toRomaji() {
//   var codeWindow = document.getElementById("textCode").contentWindow;
//   var codeText = codeWindow.document.body.innerText;
//   console.log(codeText);
//   getTextGlossing(codeText);
// }


// function capFirstLetter(line) {
//   var outputLine = '';
//   while ((line[0].match(/^[a-zA-Z]*$/) == null) && line.length > 1) {
//     outputLine += line[0];
//     line = line.substring(1);
//   }
//   outputLine += line[0].toUpperCase();
//   outputLine += line.substring(1);
//   return outputLine;
// }

// var check, pre, suff;
// var b4Change = ['o', 'ha', 'e', 'ichi nin', 'ō', 'ī', 'ā', 'ū'];
// var afterChange = ['wo', 'wa', 'he', 'hitori', 'ou', 'ii', 'aa', 'uu'];
// var need2Merge = ['tte', 'ta', 'da', 'i', 'te',
//   'de', 'nai', 'zu', 'n', 'u', 'tara', 'ba'];
// // ha -> wa
// // o -> wo
// // nai, ite
// function replaceCommon(line) {
//   var words = line.match(/\S+/g);
//   var index = -2;
//   for (var i = 0; i < words.length; i++) {
//     check = words[i];
//     pre = '';
//     suff = '';
//     if (words[i].length > 2) {
//       if ((words[i][0].match(/[^a-zA-Z]/) != null) &&
//           (words[i][words[i].length - 1].match(/[^a-zA-Z]/) != null)) {
//         check = words[i].substring(1, words[i].length - 1);
//         pre = words[i][0];
//         suff = words[i][words[i].length - 1];
//       }
//     } if (words[i].length > 1) {
//       if ((words[i][0].match(/[^a-zA-Z]/) != null)) {
//         check = words[i].substring(1, words[i].length);
//         pre = words[i][0];
//       } if ((words[i][words[i].length - 1].match(/[^a-zA-Z]/) != null)) {
//         check = words[i].substring(0, words[i].length - 1);
//         suff = words[i][words[i].length - 1];
//       }
//     }
//     index = b4Change.indexOf(check);
//     if (index > -1) {
//       words[i] = pre + afterChange[index] + suff;
//     }
//     index = need2Merge.indexOf(check);
//     if (index > 0) {
//       words[i - 1] += words[i];
//       words.splice(i, 1);
//     }
//   }
//   return words.join(' ');
// }
