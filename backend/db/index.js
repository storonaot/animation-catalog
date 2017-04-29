const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/serials')

module.exports = mongoose
