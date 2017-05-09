const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db')

const errorhandler = require('errorhandler')
const HttpError = require('./error').HttpError

const app = express()

const index = require('./routes/index')
const audiotracks = require('./routes/audiotracks')
const countries = require('./routes/countries')
const directors = require('./routes/directors')
const episodes = require('./routes/episodes')
const images = require('./routes/images')
const languages = require('./routes/languages')
const mediacontainers = require('./routes/mediacontainers')
const notes = require('./routes/notes')
const seasons = require('./routes/seasons')
const serials = require('./routes/serials')
const studios = require('./routes/studios')
const subtitles = require('./routes/subtitles')
const videoformats = require('./routes/videoformats')

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(require('./middleware/sendHttpError'))

app.use('/', index)
app.use('/audiotracks', audiotracks)
app.use('/countries', countries)
app.use('/directors', directors)
app.use('/episodes', episodes)
app.use('/images', images)
app.use('/languages', languages)
app.use('/mediacontainers', mediacontainers)
app.use('/notes', notes)
app.use('/seasons', seasons)
app.use('/serials', serials)
app.use('/studios', studios)
app.use('/subtitles', subtitles)
app.use('/videoformats', videoformats)

app.use(express.static(path.join(__dirname, '../public')))

app.use((err, req, res, next) => {
  if (typeof err === 'number') {
    err = new HttpError(err)
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err)
  } else {
    if (app.get('env') === 'development') {
      errorhandler()(err, req, res, next)
    } else {
      console.error(err)
      err = new HttpError(500)
      res.sendHttpError(err)
    }
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
