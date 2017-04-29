const db = require('../db')
const Schema = db.Schema

const TranslatorShema = new Schema({
  name: {
    type: String,
    required: true
  }
}, { collection: 'translator'})

const Translator = db.model('Translator', TranslatorShema)

function list(req, res, next) {
  return Translator.find().exec((err, translators) => {
    if (err) return next(err)
    res.json(translators)
  })
}

function read(req, res, next) {
  return Translator.findOne({
    _id: req.params.id
  }).exec((err, translator) => {
    if (err) return next(err)
    res.json(translator)
  })
}

function create(req, res, next) {
  Translator.create(req.body, (err, translator) => {
    if (err) return next(err)
    res.send(translator)
  })
}

function update(req, res, next) {
  Translator.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name } },
    { upsert: true },
    (err, newTranslator) => {
      if (err) return next(err)
      res.send(newTranslator)
    }
  )
}

function remove(req, res, next) {
  Translator.findOneAndRemove(
    { _id: req.params.id },
    (err, translator) => {
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
exports.Translator = Translator
