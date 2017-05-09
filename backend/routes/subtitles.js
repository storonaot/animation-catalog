const express = require('express')
const router = express.Router()

const Subtitle = require('../models/Subtitle')

router.get('/', Subtitle.list)
router.get('/:id', Subtitle.read)
router.post('/', Subtitle.create)
router.put('/:id', Subtitle.update)
router.delete('/:id', Subtitle.remove)

module.exports = router
