const db = require('../db')
const Schema = db.Schema
const ObjetID = require('mongodb').ObjectID

const compare = require('../helpers').compare

const SerialShema = new Schema({
  title: {
    type: String,
    required: true,
    uniq: true
  },
  originalTitle: {
    type: String,
    required: true,
    uniq: true
  },
  description: {
    type: String,
    minlength: 5,
    mixlength: 5000
  },
  _cover: {
    type: Schema.ObjectId,
    ref: 'Image',
    default: null
  },
  countries: [
    { type: Schema.ObjectId, ref: 'Country'}
  ],
  directors: [
    { type: Schema.ObjectId, ref: 'Director'}
  ],
  seasons: [
    { type: Schema.ObjectId, ref: 'Season'}
  ],
  studios: [
    { type: Schema.ObjectId, ref: 'Studio'}
  ]
}, { collection: 'serial', toJSON: { virtuals: true } })

const Serial = db.model('Serial', SerialShema)

SerialShema.virtual('yearStart').get(function() {
  if (this.seasons && this.seasons.length) {
    const episodes = this.seasons[0].episodes
    if (episodes && episodes.length) {
      const years = []
      episodes.forEach(episode => {
        years.push(new Date(episode.date).getFullYear())
      })
      years.sort(compare)
      return years[0]
    }
  }
  return null
})

SerialShema.virtual('yearEnd').get(function() {
  if (this.seasons && this.seasons.length) {
    const episodes = this.seasons[this.seasons.length - 1].episodes
    if (episodes && episodes.length) {
      const years = []
      episodes.forEach(episode => {
        years.push(new Date(episode.date).getFullYear())
      })
      years.sort(compare)
      return years[years.length - 1]
    }
  }
  return null
})

SerialShema.virtual('totalTime').get(function() {
  if (this.seasons && this.seasons.length) {
    let totalTime = 0
    this.seasons.forEach(season => {
      if (season.episodes && season.episodes.length) {
        season.episodes.forEach(episode => {
          totalTime += episode.timeMs
        })
      }
    })
    return totalTime
  }
  return null
})

SerialShema.virtual('totalSize').get(function() {
  if (this.seasons && this.seasons.length) {
    let totalSize = 0
    this.seasons.forEach(season => {
      if (season.episodes && season.episodes.length) {
        season.episodes.forEach(episode => {
          totalSize += episode.sizeB
        })
      }
    })
    return totalSize
  }
  return null
})

function list(req, res, next) {
  return Serial.find()
          .populate({
            path: '_cover',
            select: 'fileName',
          })
          .populate({
            path: 'seasons',
            select: 'episodes',
            populate: { path: 'episodes', select: 'date timeMs sizeB' }
          })
          .exec((err, serials) => {
            if (err) return next(err)
            res.json(serials)
          })
}

function read(req, res, next) {
  return Serial.findOne({ _id: req.params.id })
                .populate('_cover directors countries studios')
                .populate({
                  path: 'seasons',
                  select: ['number', '_cover', 'episodes'],
                  populate: { path: '_cover episodes' }
                })
                .exec((err, serial) => {
                  if (err) return next(err)
                  res.json(serial)
                })
}

function create(req, res, next) {
  Serial.create(req.body, (err, serial) => {
    if (err) return next(err)
    res.send(serial)
  })
}

function update(req, res, next) {
  Serial.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, serial) => {
      if (err) return next(err, serial)
      res.send(serial._id)
    }
  )
}

function remove(req, res, next) {
  Serial.findOneAndRemove(
    { _id: req.params.id },
    (err, serial) => {
      if (err) return next(err)
      res.send(serial._id)
    }
  )
}

exports.list = list
exports.read = read
exports.create = create
exports.update = update
exports.remove = remove
exports.Serial = Serial
