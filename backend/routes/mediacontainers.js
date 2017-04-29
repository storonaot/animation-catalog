const express = require('express')
const router = express.Router()

const Mediacontainer = require('../models/Mediacontainer')

router.get('/', Mediacontainer.list)
router.get('/:id', Mediacontainer.read)
router.post('/', Mediacontainer.create)
router.put('/:id', Mediacontainer.update)
router.delete('/:id', Mediacontainer.remove)

module.exports = router
