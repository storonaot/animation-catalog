const db = require('../db')
const Schema = db.Schema

const SubtitleShema = new Schema({
  type: {
    type: String,
    required: true,
    uniq: true
  }
}, { collection: 'subtitle' })

const Subtitle = db.model('Subtitle', SubtitleShema)

function list (req, res, next) {
  return Subtitle.find().exec((err, subtitles) => {
    if (err) return next(err)
    res.json(subtitles)
  })
}

function read(req, res, next) {
  return Subtitle.findOne({
    _id: req.params.id
  }).exec((err, subtitle) => {
    if (err) return next(err)
    res.json(subtitle)
  })
}

function create(req, res, next) {
  Subtitle.create(req.body, (err, subtitle) => {
    if (err) return next(err)
    res.send(subtitle)
  })
}

function update(req, res, next) {
  Subtitle.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newSubtitle) => {
      if (err) return next(err)
      res.send(newSubtitle)
    }
  )
}

function remove(req, res, next) {
  Subtitle.findOneAndRemove(
    { _id: req.params.id },
    (err, subtitle) => {
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
exports.Subtitle = Subtitle
