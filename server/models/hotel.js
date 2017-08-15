const db = require('./db');
const Sequelize = require('sequelize');

const Hotel = db.define('hotel', {
	name: Sequelize.STRING,
	num_stars: Sequelize.FLOAT,
	amenities: Sequelize.STRING
})

module.exports = Hotel;