const db = require('./db');
const Sequelize = require('sequelize');

const Activity = db.define('activity', {
	name: Sequelize.STRING,
	age_range: Sequelize.STRING
})

module.exports = Activity;