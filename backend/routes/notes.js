const express = require('express')
const router = express.Router()

const Note = require('../models/Note')

router.get('/', Note.list)
router.get('/:id', Note.read)
router.post('/', Note.create)
router.put('/:id', Note.update)
router.delete('/:id', Note.remove)

module.exports = router
