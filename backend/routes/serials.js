const express = require('express')
const router = express.Router()

const Serial = require('../models/Serial')

router.get('/', Serial.list)
router.get('/:id', Serial.read)
router.post('/', Serial.create)
router.put('/:id', Serial.update)
router.delete('/:id', Serial.remove)

module.exports = router
