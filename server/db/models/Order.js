const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define("order", {
  products: {
    type: Sequelize.JSON,
  },
  userName: {
    type: Sequelize.STRING,
  },
});

module.exports = Order