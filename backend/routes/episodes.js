const express = require('express')
const router = express.Router()

const Episode = require('../models/Episode')

// router.get('/', (req, res, next) => {
//   Episode.list(req, res)
// })
//
// router.get('/:id', (req, res, next) => {
//   Episode.read(req, res)
// })
//
// router.post('/', (req, res, next) => {
//   Episode.create(req, res)
// })
//
// router.put('/:id', (req, res, next) => {
//   Episode.update(req, res)
// })
//
// router.delete('/:id', (req, res, next) => {
//   Episode.remove(req, res)
// })

router.get('/', Episode.list)
router.get('/:id', Episode.read)
router.post('/', Episode.create)
router.put('/:id', Episode.update)
router.delete('/:id', Episode.remove)

module.exports = router
