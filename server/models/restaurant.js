const db = require('./db');
const Sequelize = require('sequelize');

const Restaurant = db.define('restaurant', {
	name: Sequelize.STRING,
	cuisine: Sequelize.STRING,
	price: Sequelize.INTEGER
})

module.exports = Restaurant;