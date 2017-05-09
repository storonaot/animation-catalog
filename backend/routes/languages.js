const express = require('express')
const router = express.Router()

const Language = require('../models/Language')

router.get('/', Language.list)
router.get('/:id', Language.read)
router.post('/', Language.create)
router.put('/:id', Language.update)
router.delete('/:id', Language.remove)

module.exports = router
