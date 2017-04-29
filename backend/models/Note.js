const db = require('../db')
const Schema = db.Schema

const NoteShema = new Schema({
  text: {
    type: String,
    required: true
  },
  importance: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
    required: true
  }
}, { collection: 'note'})

const Note = db.model('Note', NoteShema)

function list(req, res, next) {
  return Note.find().exec((err, notes) => {
    if (err) return next(err)
    res.json(notes)
  })
}

function read(req, res, next) {
  return Note.findOne({
    _id: req.params.id
  }).exec((err, note) => {
    if (err) return next(err)
    res.json(note)
  })
}

function create(req, res, next) {
  Note.create(req.body, (err, note) => {
    if (err) return next(err)
    res.send(note)
  })
}

function update(req, res, next) {
  Note.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newNote) => {
      if (err) return next(err)
      res.send(newNote)
    }
  )
}

function remove(req, res, next) {
  Note.findOneAndRemove(
    { _id: req.params.id },
    (err, note) => {
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
exports.Note = Note
