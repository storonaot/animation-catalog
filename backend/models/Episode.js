const db = require('../db')
const Schema = db.Schema

const Season = require('./Season').Season

const EpisodeShema = new Schema({
  number: {
    type: Number,
    required: true,
    min: 0,
  },
  title: {
    type: String,
    required: true
  },
  originalTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    minlength: 5,
    mixlength: 5000
  },
  date: {
    type: Date,
    required: true
  },
  timeMs: {
    type: Number,
    required: true,
    min: 0
  },
  sizeB: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  marks: {
    tabbed: {
      type: Boolean,
      default: false
    },
    viewed: {
      type: Boolean,
      default: false
    }
  },
  _cover: {
    type: Schema.ObjectId,
    ref: 'Image',
    default: null
  },
  _season: {
    type: Schema.ObjectId,
    ref: 'Season',
    required: true
  },
  _serial: {
    type: Schema.ObjectId,
    ref: 'Serial',
    required: true
  },
  scenes: [
    { type: Schema.ObjectId, ref: 'Image'}
  ],
  // translators: [
  //   { type: Schema.ObjectId, ref: 'Translator'}
  // ],
  // voiceovers: [
  //   { type: Schema.ObjectId, ref: 'Voiceover'}
  // ],
  subtitles: [
    { type: Schema.ObjectId, ref: 'Subtitles'}
  ],
  _language: {
    type: Schema.ObjectId,
    ref: 'Language',
    required: true
  },
  audiotracks: [
    { type: Schema.ObjectId, ref: 'Audiotracks'}
  ],
  notes: [
    { type: Schema.ObjectId, ref: 'Note'}
  ],
  _videoformat: {
    type: Schema.ObjectId,
    ref: 'Videoformat',
    required: true
  },
  _mediacontainer: {
    type: Schema.ObjectId,
    ref: 'Mediacontainer',
    required: true
  }
}, { collection: 'episode'})

const Episode = db.model('Episode', EpisodeShema)

function list(req, res, next) {
  return Episode.find({})
                // .populate({ path: '_cover' })
                .exec((err, episodes) => {
                  if (err) return next(err)
                  res.json(episodes)
                })
}

function read(req, res, next) {
  return Episode.findOne({
    _id: req.params.id
  }).exec((err, episode) => {
    if (err) return next(err)
    res.json(episode)
  })
}

function create(req, res, next) {
  let newEpisode = new Episode()

  newEpisode.number = req.body.number
  newEpisode.title = req.body.title
  newEpisode.originalTitle = req.body.originalTitle
  newEpisode.description = req.body.description
  newEpisode.date = req.body.date
  newEpisode.timeMs = req.body.timeMs
  newEpisode.sizeB = req.body.sizeB
  newEpisode._season = req.body._season
  newEpisode._videoformat = req.body._videoformat
  newEpisode._mediacontainer = req.body._mediacontainer
  newEpisode.save((err, episode) => {
    if (err) return next(err)
    res.json(episode)
    addEpisodeToSeason(episode._season, episode._id)
  })
}

function update(req, res, next) {
  Episode.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    (err, newEpisode) => {
      if (err) return next(err)
      res.send(newEpisode)
    }
  )
}

function remove(req, res, next) {
  Episode.findOneAndRemove(
    { _id: req.params.id },
    (err, episode) => {
      if (err) return next(err)
      res.status(204)
    }
  )
}

function addEpisodeToSeason(seasonId, episodeId) {
  Season.findByIdAndUpdate(
    seasonId,
    { '$push': { 'episodes': episodeId } },
    { 'new': true, 'upsert': true },
    (err, season) => {
      if (err) throw err
    }
  )
}

exports.list = list
exports.read = read
exports.create = create
exports.update = update
exports.remove = remove
exports.Episode = Episode
