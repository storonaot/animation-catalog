const express = require('express')
const router = express.Router()

const Image = require('../models/Image')

router.get('/', Image.list)
router.get('/:id', Image.read)
router.post('/', Image.create)
router.put('/:id', Image.update)
router.delete('/:id', Image.remove)

module.exports = router
