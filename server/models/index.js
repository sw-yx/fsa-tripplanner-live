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
// Day.belongsToMany(Hotel, {through: 'itinerary_hotel'});
// Day.belongsToMany(Restaurant, {through: 'itinerary_restaurant'});
// Day.belongsToMany(Activity, {through: 'itinerary_activity'});
// Day.belongsTo(Itinerary)
// Itinerary.Days = Itinerary.hasMany(Day);
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