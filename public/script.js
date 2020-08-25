function copy() {
  const range = document.createRange();
  range.selectNode(document.getElementById('romaji'));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}
