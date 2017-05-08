const db = require('../db')
const Schema = db.Schema

const LanguageShema = new Schema({
  title: {
    type: string,
    require: true
  },
  alias: {
    type: string,
    require: true
  }
}, { collection: 'language'})

const Language = db.model('Language', LanguageShema)

function list (req, res, next) {
  return Language.find().exec((err, language) => {
    if (err) return next(err)
    res.json(language)
  })
}

function create(req, res, next) {
  Language.create(req.body, (err, language) => {
    if (err) return next(err)
    res.send(language)
  })
}

exports.list = list
exports.create = create
exports.Language = Language
