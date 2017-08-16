const Place = require('./place');
const Hotel = require('./hotel');
const Restaurant = require('./restaurant');
const Activity = require('./activity');
const db = require('./db');
const Sequelize = require('sequelize');

const Day = db.define('day', {
	hotels: Sequelize.ARRAY(Sequelize.INTEGER),
	restaurants: Sequelize.ARRAY(Sequelize.INTEGER),
	activities: Sequelize.ARRAY(Sequelize.INTEGER)
})

const Itinerary = db.define('itinerary', {
	name: Sequelize.STRING
})

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);
Itinerary.hasMany(Day);

module.exports = {
	Hotel,
	Place,
	Restaurant,
	Activity,
	Itinerary,
	Day,
	db
};