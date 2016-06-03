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
    window.noTranslation = false
    dom.query('#kanji_translation').innerHTML = window.letter.translation
    dom.query('#kanji_romanji').innerHTML = window.letter.romanji.join(', ')
    dom.query('#translation').stylise({
      display: 'block'
    })
  } else {
    window.noTranslation = true
    dom.query('#kana_romanji').innerHTML = window.letter.romanji
    dom.query('#translation').stylise({
      display: 'none'
    })
  }

  dom.query('#romanji_mark')
    .changeClass('icon-checkmark', 'icon-cross')
    .changeClass('button-correct', 'button-incorrect')
  dom.query('#translation_mark')
    .changeClass('icon-checkmark', 'icon-cross')
    .changeClass('button-correct', 'button-incorrect')
  var romanjiInput = dom.query('#romanji_input')
  romanjiInput.value = ''
  var translationInput = dom.query('#translation_input')
  translationInput.value = ''
  romanjiInput.focus()
}

function success() {
  if(window.romanjiCorrect && (window.translationCorrect || window.noTranslation))
  reveal(function() {
    window.romanjiCorrect = false
    window.translationCorrect = false
    window.noTranslation = false
    generate()
  })
}

function validateRomanji(word) {
  word = word.toLowerCase()
  var romanji = [].concat(window.letter.romanji)
  if(romanji.indexOf(word) !== -1) {
    window.romanjiCorrect = true
    dom.query('#romanji_mark')
      .changeClass('icon-cross', 'icon-checkmark')
      .changeClass('button-incorrect', 'button-correct')
    success()
  } else {
    window.romanjiCorrect = false
    dom.query('#romanji_mark')
      .changeClass('icon-checkmark', 'icon-cross')
      .changeClass('button-correct', 'button-incorrect')
  }
}

function validateTranslation(word) {
  word = word.toLowerCase()
  var translation = [].concat(window.letter.translation)
  if(translation.indexOf(word) !== -1) {
    window.translationCorrect = true
    dom.query('#translation_mark')
      .changeClass('icon-cross', 'icon-checkmark')
      .changeClass('button-incorrect', 'button-correct')
    success()
  } else {
    window.translationCorrect = false
    dom.query('#translation_mark')
      .changeClass('icon-checkmark', 'icon-cross')
      .changeClass('button-correct', 'button-incorrect')
  }
}

function reveal(callback) {
  callback = callback || function() {}
  var revealChar = dom.query('#kana_reveal')
  if(window.letter.hasOwnProperty('translation')) revealChar = dom.query('#kanji_reveal')
  revealChar.stylise({
    display: 'inline-block'
  })
  setTimeout(function () {
    revealChar.stylise({
      display: 'none'
    })
    callback()
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
