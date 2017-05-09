const db = require('../db')
const Schema = db.Schema

const AudiotrackSchema = new Schema({
  title: {
    type: String,
    required: true,
    uniq: true
  }
}, { collection: 'audiotrack' })

const Audiotrack = db.model('Audiotrack', AudiotrackSchema)

function list (req, res, next) {
  return Audiotrack.find().exec((err, audiotrack) => {
    if (err) return next(err)
    res.json(audiotrack)
  })
}

function read(req, res, next) {
  return Audiotrack.findOne({
    _id: req.params.id
  }).exec((err, audiotrack) => {
    if (err) return next(err)
    res.json(audiotrack)
  })
}

function create(req, res, next) {
  Audiotrack.create(req.body, (err, audiotrack) => {
    if (err) return next(err)
    res.send(audiotrack)
  })
}

function update(req, res, next) {
  Audiotrack.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newAudiotrack) => {
      if (err) return next(err)
      res.send(newAudiotrack)
    }
  )
}

function remove(req, res, next) {
  Audiotrack.findOneAndRemove(
    { _id: req.params.id },
    (err, audiotrack) => {
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
exports.Audiotrack = Audiotrack
