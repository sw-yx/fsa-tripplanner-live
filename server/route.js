const express = require('express')
const router = express.Router()
const models = require('./models')

router.get('/all', async function (req, res, next) {
    var Hotels = await models.Hotel.findAll({ include: [{ all: true }] })
    var Restaurants = await models.Restaurant.findAll({ include: [{ all: true }] })
    var Activities = await models.Activity.findAll({ include: [{ all: true }] })
    res.json({
        Hotels,
        Restaurants,
        Activities,
    })
})

module.exports = router