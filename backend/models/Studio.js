const db = require('../db')
const Schema = db.Schema

const StudioShema = new Schema({
  name: {
    type: String,
    required: true
  }
}, { collection: 'studio'})

const Studio = db.model('Studio', StudioShema)

function list(req, res, next) {
  return Studio.find().exec((err, studios) => {
    if (err) return next(err)
    res.json(studios)
  })
}

function read(req, res, next) {
  return Studio.findOne({
    _id: req.params.id
  }).exec((err, studio) => {
    if (err) return next(err)
    res.json(studio)
  })
}

function create(req, res, next) {
  Studio.create(req.body, (err, studio) => {
    if (err) return next(err)
    res.send(studio)
  })
}

function update(req, res, next) {
  Studio.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newStudio) => {
      if (err) return next(err)
      res.send(newStudio)
    }
  )
}

function remove(req, res, next) {
  Studio.findOneAndRemove(
    { _id: req.params.id },
    (err, сover) => {
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
exports.Studio = Studio
