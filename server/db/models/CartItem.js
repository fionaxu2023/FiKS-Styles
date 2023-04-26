const Sequelize = require("sequelize");
const db = require("../db");
const Cart=require("./Cart")
const Product=require("./Product");

const CartItems = db.define("cartItems", {
  quantity: {
    type: Sequelize.INTEGER,
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
  },
});

module.exports = CartItems;