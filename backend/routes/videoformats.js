const express = require('express')
const router = express.Router()

const Videoformat = require('../models/Videoformat')

router.get('/', Videoformat.list)
router.get('/:id', Videoformat.read)
router.post('/', Videoformat.create)
router.put('/:id', Videoformat.update)
router.delete('/:id', Videoformat.remove)

module.exports = router
