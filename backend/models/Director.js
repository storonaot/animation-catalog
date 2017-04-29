const db = require('../db')
const Schema = db.Schema

const DirectorShema = new Schema({
  name: String,
  originalName: {
    type: String,
    required: true
  }
}, { collection: 'director'})

const Director = db.model('Director', DirectorShema)

function list(req, res, next) {
  return Director.find().exec((err, directors) => {
    if (err) return next(err)
    res.json(directors)
  })
}

function read(req, res, next) {
  return Director.findOne({
    _id: req.params.id
  }).exec((err, director) => {
    if (err) return next(err)
    res.json(director)
  })
}

function create(req, res, next) {
  Director.create(req.body, (err, director) => {
    if (err) return next(err)
    res.send(director)
  })
}

function update(req, res, next) {
  Director.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newDirector) => {
      if (err) return next(err)
      res.send(newDirector)
    }
  )
}

function remove(req, res, next) {
  Director.findOneAndRemove(
    { _id: req.params.id },
    (err, director) => {
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
exports.Director = Director
