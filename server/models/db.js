const config = {
  "database": "trip_planner",
  "host": "localhost",
  "dialect": "postgres",
  "logging": false
};

const Sequelize = require('sequelize');

module.exports = new Sequelize(config.database, config.username, config.password, config);
