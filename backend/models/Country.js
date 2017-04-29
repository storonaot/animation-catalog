const db = require('../db')
const Schema = db.Schema
const HttpError = require('../error').HttpError

const CountryShema = new Schema({
  name: {
    type: String,
    required: true
  }
}, { collection: 'country'})

const Country = db.model('Country', CountryShema)

function list(req, res, next) {
  return Country.find().exec((err, countries) => {
    if (err) return next(err)
    res.json(countries)
  })
}

function read(req, res, next) {
  return Country.findOne({
    _id: req.params.id
  }).exec((err, country) => {
    if (err) return next(err)
    res.json(country)
  })
}

function create(req, res, next) {
  // const translator = new Translator({
  //   name: req.body.name
  // })
  //
  // return translator.save().exec((err, translator) => {
  //   if (err) {
  //     res.send('error has occured')
  //   } else {
  //     res.json(translator)
  //   }
  // })
  // или
  Country.create(req.body, (err, country) => {
    if (err) return next(err)
    res.send(country)
  })
}

function update(req, res, next) {
  Country.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newCountry) => {
      if (err) return next(err)
      res.send(newCountry)
    }
  )
}

function remove(req, res, next) {
  Country.findOneAndRemove(
    { _id: req.params.id },
    (err, country) => {
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
exports.Country = Country
