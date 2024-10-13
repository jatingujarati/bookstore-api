const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cart = require('./Cart');
const Book = require('./Book');

const CartItem = sequelize.define('CartItem', {
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cart,
      key: 'id',
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = CartItem;
