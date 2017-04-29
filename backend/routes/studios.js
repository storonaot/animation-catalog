const express = require('express')
const router = express.Router()

const Studio = require('../models/Studio')

router.get('/', Studio.list)
router.get('/:id', Studio.read)
router.post('/', Studio.create)
router.put('/:id', Studio.update)
router.delete('/:id', Studio.remove)

module.exports = router
