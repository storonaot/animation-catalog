const express = require('express')
const router = express.Router()

const Director = require('../models/Director')

router.get('/', Director.list)
router.get('/:id', Director.read)
router.post('/', Director.create)
router.put('/:id', Director.update)
router.delete('/:id', Director.remove)

module.exports = router
