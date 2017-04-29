const db = require('../db')
const Schema = db.Schema
const HttpError = require('../error').HttpError
const ObjetID = require('mongodb').ObjectID
const compare = require('../helpers').compare

const Serial = require('./Serial').Serial

const SeasonShema = new Schema({
  number: {
    type: Number,
    required: true,
    min: 0,
  },
  _serial: {
    type: Schema.ObjectId,
    ref: 'Serial',
    required: true
  },
  _cover: {
    type: Schema.ObjectId,
    ref: 'Image',
    default: null
  },
  episodes: [
    { type: Schema.ObjectId, ref: 'Episode'}
  ]
}, { collection: 'season', toJSON: { virtuals: true } })

const Season = db.model('Season', SeasonShema)

SeasonShema.virtual('totalTime').get(function() {
  if (this.episodes && this.episodes.length) {
    let totalTime = 0
    this.episodes.forEach(episode => {
      totalTime += episode.timeMs
    })
    return totalTime
  }
  return null
})

SeasonShema.virtual('totalSize').get(function() {
  if (this.episodes && this.episodes.length) {
    let totalSize = 0
    this.episodes.forEach(episode => {
      totalSize += episode.sizeB
    })
    return totalSize
  }
  return null
})

SeasonShema.virtual('yearStart').get(function() {
  if (this.episodes && this.episodes.length) {
    const years = []
    this.episodes.forEach(episode => {
      years.push(new Date(episode.date).getTime())
    })
    years.sort(compare)
    return new Date(years[0]).getFullYear()
  }
  return null
})

SeasonShema.virtual('yearEnd').get(function() {
  if (this.episodes && this.episodes.length) {
    const years = []
    this.episodes.forEach(episode => {
      years.push(new Date(episode.date).getTime())
    })
    years.sort(compare)
    return new Date(years[years.length - 1]).getFullYear()
  }
  return null
})

function list(req, res, next) {
  return Season.find()
               .exec((err, seasons) => {
                  if (err) return next(err)
                  res.json(seasons)
                })
}

function read(req, res, next) {
  let id
  try {
    id = new ObjetID(req.params.id)
  } catch(e) {
    return next(404)
  }
  return Season.findById(id)
                .populate({
                  path: '_cover',
                  select: 'fileName'
                })
                .populate({
                  path: 'episodes',
                  select: ['number', '_cover', 'title', 'originalTitle', 'date', 'timeMs', 'sizeB'],
                  populate: { path: '_cover' }
                })
                .exec((err, season) => {
                  if (err) return next(err)
                  if (!season) {
                    next(new HttpError(404, 'Season not found'))
                  } else {
                    res.json(season)
                  }
                })
}

function create(req, res, next) {
  Season.create(req.body, (err, season) => {
    if (err) return next(err)

    addSeasonToSerial(req.body._serial, season._id)
    res.send(season)
  })
}

function update(req, res, next) {
  Season.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newSeason) => {
      if (err) return next(err)
      res.send(newSeason)
    }
  )
}

function remove(req, res, next) {
  Season.findOneAndRemove(
    { _id: req.params.id },
    (err, season) => {
      if (err) return next(err)
      res.send(204)
      // res.status(204)
    }
  )
}

function addSeasonToSerial(serialId, seasonId) {
  Serial.findByIdAndUpdate(
    serialId,
    { '$push': { 'seasons': seasonId } },
    { 'new': true, 'upsert': true },
    (err, serial) => {
      if (err) throw err
      // console.log(serial)
    }
  )
}

exports.list = list
exports.read = read
exports.create = create
exports.update = update
exports.remove = remove
exports.Season = Season
