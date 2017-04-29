const db = require('../db')
const Schema = db.Schema

const ImageShema = new Schema({
  fileName: {
    type: String,
    required: true
  }
}, { collection: 'image'})

const Image = db.model('Image', ImageShema)

function list(req, res, next) {
  return Image.find().exec((err, image) => {
    if (err) return next(err)
    res.json(image)
  })
}

function read(req, res, next) {
  return Image.findOne({
    _id: req.params.id
  }).exec((err, image) => {
    if (err) return next(err)
    res.json(image)
  })
}

function create(req, res, next) {
  Image.create(req.body, (err, image) => {
    if (err) return next(err)
    res.send(image)
  })
}

function update(req, res, next) {
  Image.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newImage) => {
      if (err) return next(err)
      res.send(newImage)
    }
  )
}

function remove(req, res, next) {
  Image.findOneAndRemove(
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
exports.Image = Image
