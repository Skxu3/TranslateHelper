function copy(target) {
  const range = document.createRange();
  range.selectNode(document.getElementById(target));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}

function edit(id) {
  const target = '#' + id;
  const button = id == 'romaji' ?
  	$('button#romaji-edit-button') :
  	$('button#text-edit-button');

  if (button.text() == 'Disable Edit') {
  	$(button).text('Enable Edit');
  	$(target).prop('disabled', true);
  } else {
  	$(button).text('Disable Edit');
  	$(target).prop('disabled', false);
  }
}
