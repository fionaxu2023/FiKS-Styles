const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define("cart", {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
});


module.exports = Cart