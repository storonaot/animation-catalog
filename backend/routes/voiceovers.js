const express = require('express')
const router = express.Router()

const Voiceover = require('../models/Voiceover')

router.get('/', Voiceover.list)
router.get('/:id', Voiceover.read)
router.post('/', Voiceover.create)
router.put('/:id', Voiceover.update)
router.delete('/:id', Voiceover.remove)

module.exports = router
