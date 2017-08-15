const config = {
  "database": "trip_planner",
  "host": "localhost",
  "dialect": "postgres",
  "logging": false
};

const Sequelize = require('sequelize');

module.exports = process.env.DATABASE_URL ? 
  new Sequelize(process.env.DATABASE_URL, config) :
  new Sequelize(config.database, config.username, config.password, config);
