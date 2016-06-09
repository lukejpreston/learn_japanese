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

function searchKana(value) {
  dom.queryAll('.kana').forEach(function (el) {
    var visibility = value.length > 0 ? 'hidden' : 'visible';
    el.stylise({
        visibility: visibility
    })
  })
  for(var i = 0; i < value.length; i++) {
    var char = value[i]
    dom.queryAll('.kana_' + char).forEach(function(el) {
      el.stylise({
        visibility: 'visible'
      })
    })
  }
}

function searchKanji(value) {
  dom.queryAll('.kanji_row').forEach(function (el) {
    var display = value.length > 0 ? 'none' : 'table-row'
    el.stylise({
      display: display
    })
  })

  dom.queryAll('.kanji_cell')
    .filter(function(el) {
      return el.innerHTML.indexOf(value) !== -1
    })
    .forEach(function(el) {
      el.parentElement.style.display = 'table-row'
    })
}
