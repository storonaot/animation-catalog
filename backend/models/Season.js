const db = require('../db')
const Schema = db.Schema
const HttpError = require('../error').HttpError
const ObjetID = require('mongodb').ObjectID
const compare = require('../helpers').compare
const url = require('url')


const Serial = db.models.Serial

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

// SeasonShema.virtual('totalTime').get(function() {
//   if (this.episodes && this.episodes.length) {
//     let totalTime = 0
//     this.episodes.forEach(episode => {
//       totalTime += episode.timeMs
//     })
//     return totalTime
//   }
//   return null
// })

// SeasonShema.virtual('totalSize').get(function() {
//   if (this.episodes && this.episodes.length) {
//     let totalSize = 0
//     this.episodes.forEach(episode => {
//       totalSize += episode.sizeB
//     })
//     return totalSize
//   }
//   return null
// })

// SeasonShema.virtual('yearStart').get(function() {
//   if (this.episodes && this.episodes.length) {
//     const years = []
//     this.episodes.forEach(episode => {
//       years.push(new Date(episode.date).getTime())
//     })
//     years.sort(compare)
//     return new Date(years[0]).getFullYear()
//   }
//   return null
// })

// SeasonShema.virtual('yearEnd').get(function() {
//   if (this.episodes && this.episodes.length) {
//     const years = []
//     this.episodes.forEach(episode => {
//       years.push(new Date(episode.date).getTime())
//     })
//     years.sort(compare)
//     return new Date(years[years.length - 1]).getFullYear()
//   }
//   return null
// })

function list(req, res, next) {
  const parsed = url.parse(req.url, true)
  if (parsed.query.id) {
    return Season.find()
                 .where({ _serial: parsed.query.id})
                 .exec((err, seasons) => {
                    if (err) return next(err)
                    res.json(seasons)
                  })
  } else {
    return Season.find()
                 .exec((err, seasons) => {
                    if (err) return next(err)
                    res.json(seasons)
                  })
  }
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
                  path: '_serial',
                  select: 'title'
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

    db.models.Serial.findByIdAndUpdate(
      req.body._serial,
      { '$push': { 'seasons': season._id } },
      (err, serial) => {
        if (err) throw err
        res.send(season)
      }
    )

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
    // db.models.Serial.findByIdAndUpdate(
    // Serial.findOneAndUpdate(
    //   season._serial,
    //   $pop: ['seasons': season._id],
    //   { new: true },
    //   (err, newSeason) => {
    //     if (err) return next(err)
    //      res.send(newSeason)
    //   }
    // )

  Season.findOneAndRemove(
    { _id: req.params.id },
    (err, season) => {
      if (err) return next(err)
      res.send(204)
    }
  )
}

exports.list = list
exports.read = read
exports.create = create
exports.update = update
exports.remove = remove
exports.Season = Season
