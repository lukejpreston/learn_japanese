function change(name, display) {
  dom.queryAll('.' + name).forEach(function(el) {
    el.stylise({
      display: display
    })
  })
}

function updateKana() {
  var hiragana = dom.query('#hiragana_filter').checked
  var katakana = dom.query('#katakana_filter').checked

  change('hiragana', 'none')
  change('katakana', 'none')

  if(hiragana) {
    change('hiragana', 'inline-block')
  }
  if(katakana) {
    change('katakana', 'inline-block')
  }

  if(!hiragana && !katakana) {
    change('hiragana', 'inline-block')
    change('katakana', 'inline-block')
  }
}

function changeKanji(index) {
  var kanji = dom.query('#kanji_' + index).checked
  change('kanji_' + index, 'none')
  if(kanji) {
    change('kanji_' + index)
  }
}

function updateKanji() {
  for(var i = 1; i <= 6; i++) changeKanji(i)
}

updateKana()
updateKanji()
