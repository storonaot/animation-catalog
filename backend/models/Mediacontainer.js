const db = require('../db')
const Schema = db.Schema

const MediacontainerShema = new Schema({
  name: String
}, { collection: 'mediacontainer'})

const Mediacontainer = db.model('Mediacontainer', MediacontainerShema)

function list(req, res, next) {
  return Mediacontainer.find().exec((err, mediacontainers) => {
    if (err) return next(err)
    res.json(mediacontainers)
  })
}

function read(req, res, next) {
  return Mediacontainer.findOne({
    _id: req.params.id
  }).exec((err, mediacontainer) => {
    if (err) return next(err)
    res.json(mediacontainer)
  })
}

function create(req, res, next) {
  Mediacontainer.create(req.body, (err, mediacontainer) => {
    if (err) return next(err)
    res.send(mediacontainer)
  })
}

function update(req, res, next) {
  Mediacontainer.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newMediacontainer) => {
      if (err) return next(err)
      res.send(newMediacontainer)
    }
  )
}

function remove(req, res, next) {
  Mediacontainer.findOneAndRemove(
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
exports.Mediacontainer = Mediacontainer
