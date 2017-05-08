const db = require('../db')
const Schema = db.Schema

const SubtitlesShema = new Schema({
  type: {
    type: String,
    required: true
  }
}, { collection: 'subtitles'})

const Subtitles = db.model('Subtitles', SubtitlesShema)

function list (req, res, next) {
  return Subtitles.find().exec((err, subtitles) => {
    if (err) return next(err)
    res.json(subtitles)
  })
}

function create(req, res, next) {
  Subtitles.create(req.body, (err, subtitles) => {
    if (err) return next(err)
    res.send(subtitles)
  })
}

exports.list = list
exports.create = create
exports.Subtitles = Subtitles
