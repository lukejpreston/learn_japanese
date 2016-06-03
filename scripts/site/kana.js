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

  change('kana', 'none')
  change('hiragana', 'none')
  change('katakana', 'none')

  if(hiragana && katakana) {
    change('kana', 'inline-block')
  } else if(hiragana) {
    change('hiragana', 'inline-block')
  } else if(katakana) {
    change('katakana', 'inline-block')
  } else {
    change('kana', 'inline-block')
  }
}

updateKana()
