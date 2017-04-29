const express = require('express')
const router = express.Router()

const Country = require('../models/Country')

router.get('/', Country.list)
router.get('/:id', Country.read)
router.post('/', Country.create)
router.put('/:id', Country.update)
router.delete('/:id', Country.remove)

module.exports = router
