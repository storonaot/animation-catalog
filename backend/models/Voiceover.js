const db = require('../db')
const Schema = db.Schema

const VoiceoverShema = new Schema({
  name: {
    type: String,
    required: true
  }
}, { collection: 'voiceover'})

const Voiceover = db.model('Voiceover', VoiceoverShema)

function list(req, res, next) {
  return Voiceover.find().exec((err, voiceovers) => {
    if (err) return next(err)
    res.json(voiceovers)
  })
}

function read(req, res, next) {
  return Voiceover.findOne({
    _id: req.params.id
  }).exec((err, voiceover) => {
    if (err) return next(err)
    res.json(voiceover)
  })
}

function create(req, res, next) {
  Voiceover.create(req.body, (err, voiceover) => {
    if (err) return next(err)
    res.send(voiceover)
  })
}

function update(req, res, next) {
  Voiceover.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newVoiceover) => {
      if (err) return next(err)
      res.send(newVoiceover)
    }
  )
}

function remove(req, res, next) {
  Voiceover.findOneAndRemove(
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
exports.Voiceover = Voiceover
