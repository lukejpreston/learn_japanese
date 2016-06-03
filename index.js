var kanji = require('./kanji')

Object.keys(kanji).forEach(function(key) {
  var grade = kanji[key]
  var newGrade = grade.map(function (word) {
    var ws = word
      .split('\t')
      .filter(function (w) {
        return w !== ''
      })
    var romanji = ws.slice(2).join().replace(/ /g, '').split(',')
    return {code: '&#' + ws[0].charCodeAt(0) + ';', translation: ws[1], romanji: romanji}
  })
  kanji[key] = newGrade
})

var fs = require('fs')

fs.writeFileSync('kanji_full.json', JSON.stringify(kanji, null, 4))
