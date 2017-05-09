const db = require('../db')
const Schema = db.Schema

const LanguageShema = new Schema({
  title: {
    type: String,
    required: true,
    uniq: true
  },
  alias: {
    type: String,
    required: true,
    uniq: true
  }
}, { collection: 'language' })

const Language = db.model('Language', LanguageShema)

function list (req, res, next) {
  return Language.find().exec((err, language) => {
    if (err) return next(err)
    res.json(language)
  })
}

function read(req, res, next) {
  return Language.findOne({
    _id: req.params.id
  }).exec((err, language) => {
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

function update(req, res, next) {
  Language.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newLanguage) => {
      if (err) return next(err)
      res.send(newLanguage)
    }
  )
}

function remove(req, res, next) {
  Language.findOneAndRemove(
    { _id: req.params.id },
    (err, language) => {
      if (err) return next(err)
      res.status(204)
    }
  )
}

exports.list = list
exports.read = read
exports.create = create
exports.update = update
exports.remove = remove
exports.Language = Language
