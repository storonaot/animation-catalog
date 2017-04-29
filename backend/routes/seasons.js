const express = require('express')
const router = express.Router()

const Season = require('../models/Season')

router.get('/', Season.list)
router.get('/:id', Season.read)
router.post('/', Season.create)
router.put('/:id', Season.update)
router.delete('/:id', Season.remove)

module.exports = router
