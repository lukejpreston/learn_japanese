function getLetter() {
  var letters = []
  var hiragana = dom.query('#hiragana').checked
  var katakana = dom.query('#katakana').checked
  var grade_1 = dom.query('#grade_1').checked
  var grade_2 = dom.query('#grade_2').checked
  var grade_3 = dom.query('#grade_3').checked
  var grade_4 = dom.query('#grade_4').checked
  var grade_5 = dom.query('#grade_5').checked
  var grade_6 = dom.query('#grade_6').checked

  if(hiragana) letters = letters.concat(kana.hiragana)
  if(katakana) letters = letters.concat(kana.katakana)
  if(grade_1) letters = letters.concat(kanji[0])
  if(grade_2) letters = letters.concat(kanji[1])
  if(grade_3) letters = letters.concat(kanji[2])
  if(grade_4) letters = letters.concat(kanji[3])
  if(grade_5) letters = letters.concat(kanji[4])
  if(grade_6) letters = letters.concat(kanji[5])

  var number = Math.floor(Math.random() * letters.length)
  return letters[number]
}

function generate() {
  window.letter = getLetter()
  dom.query('#character').innerHTML = window.letter.code

  if(window.letter.hasOwnProperty('translation')) {
    dom.query('#kanji_translation').innerHTML = window.letter.translation
    dom.query('#kanji_romanji').innerHTML = window.letter.romanji.join(', ')
  } else
    dom.query('#kana_romanji').innerHTML = window.letter.romanji

  dom.query('#mark')
    .changeClass('icon-checkmark', 'icon-cross')
    .changeClass('button-correct', 'button-incorrect')

  var input = dom.query('#input')
  input.value = ''
  input.focus()
}

function validate(word) {

}

function reveal() {
  var revealChar = dom.query('#kana_reveal')
  if(window.letter.hasOwnProperty('translation')) revealChar = dom.query('#kanji_reveal')
  revealChar.stylise({
    display: 'inline-block'
  })
  setTimeout(function () {
    revealChar.stylise({
      display: 'none'
    })
  }, 1000)
}

function say() {

}

generate()

function panel(name) {
  var panel = dom.query('#' + name)

  panel.stylise({
    display: panel.style.display === 'none' ? 'block' : 'none'
  })
}
