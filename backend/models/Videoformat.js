const db = require('../db')
const Schema = db.Schema

const VideoformatShema = new Schema({
  title: String,
  resolution: String,
  ratio: String,
  format: String,
}, { collection: 'videoformat'})

const Videoformat = db.model('Videoformat', VideoformatShema)

function list(req, res, next) {
  return Videoformat.find().exec((err, videoformats) => {
    if (err) return next(err)
    res.json(videoformats)
  })
}

function read(req, res, next) {
  return Videoformat.findOne({
    _id: req.params.id
  }).exec((err, videoformat) => {
    if (err) return next(err)
    res.json(videoformat)
  })
}

function create(req, res, next) {
  Videoformat.create(req.body, (err, videoformat) => {
    if (err) return next(err)
    res.send(videoformat)
  })
}

function update(req, res, next) {
  Videoformat.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newVideoformat) => {
      if (err) return next(err)
      res.send(newVideoformat)
    }
  )
}

function remove(req, res, next) {
  Videoformat.findOneAndRemove(
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
exports.Videoformat = Videoformat
