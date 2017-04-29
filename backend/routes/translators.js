const express = require('express')
const router = express.Router()

const Translator = require('../models/Translator')

router.get('/', Translator.list)
router.get('/:id', Translator.read)
router.post('/', Translator.create)
router.put('/:id', Translator.update)
router.delete('/:id', Translator.remove)

module.exports = router
