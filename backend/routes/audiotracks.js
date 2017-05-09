const express = require('express')
const router = express.Router()

const Audiotrack = require('../models/Audiotrack')

router.get('/', Audiotrack.list)
router.get('/:id', Audiotrack.read)
router.post('/', Audiotrack.create)
router.put('/:id', Audiotrack.update)
router.delete('/:id', Audiotrack.remove)

module.exports = router
