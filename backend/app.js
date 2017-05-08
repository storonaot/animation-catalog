const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db')

const errorhandler = require('errorhandler')
const HttpError = require('./error').HttpError

const app = express()

const index = require('./routes/index')

const studios = require('./routes/studios')
const countries = require('./routes/countries')
const mediacontainers = require('./routes/mediacontainers')
const videoformats = require('./routes/videoformats')
// const voiceovers = require('./routes/voiceovers')
// const translators = require('./routes/translators')
const images = require('./routes/images')
const directors = require('./routes/directors')
const notes = require('./routes/notes')
const serials = require('./routes/serials')
const seasons = require('./routes/seasons')
const episodes = require('./routes/episodes')

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(require('./middleware/sendHttpError'))

app.use('/', index)
app.use('/studios', studios)
app.use('/countries', countries)
app.use('/mediacontainers', mediacontainers)
app.use('/videoformats', videoformats)
// app.use('/voiceovers', voiceovers)
// app.use('/translators', translators)
app.use('/directors', directors)
app.use('/images', images)
app.use('/notes', notes)
app.use('/serials', serials)
app.use('/seasons', seasons)
app.use('/episodes', episodes)

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
