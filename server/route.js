const express = require("express");
const router = express.Router();
const models = require("./models");

router.get("/all", async function(req, res, next) {
  var Hotels = await models.Hotel.findAll({ include: [{ all: true }] });
  var Restaurants = await models.Restaurant.findAll({
    include: [{ all: true }]
  });
  var Activities = await models.Activity.findAll({ include: [{ all: true }] });
  res.json({
    Hotels,
    Restaurants,
    Activities
  });
});

router.post("/itineraries", function(req, res, next) {
  // we have req.body.name and req.body.plan
  models.Itinerary.create(
    {
      name: req.body.name,
      days: req.body.plan.days
    },
    {
      include: [models.Day]
    }
  ).then(x => res.json(x))
  .catch(err => res.status(500).json(err))
});

router.get("/itineraries/:name", async function(req, res, next) {
  var Itineraries = await models.Itinerary.findOne({
    where: {
      name: req.params.name
    },
    include: [{ all: true }]
  });
  res.json({ Itineraries });
});

module.exports = router;
