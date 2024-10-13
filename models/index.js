const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import all models
const User = require('./User');
const Book = require('./Book');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Initialize all models and define associations

// User has one Cart
User.hasOne(Cart, {
  foreignKey: 'userId',
  as: 'cart',
});
Cart.belongsTo(User, { foreignKey: 'userId' });

// Cart has many CartItems
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'cartItems' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// CartItem belongs to Book
CartItem.belongsTo(Book, { foreignKey: 'bookId' });
Book.hasMany(CartItem, { foreignKey: 'bookId', as: 'cartItems' });

// User has many Orders
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order has many OrderItems
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// OrderItem belongs to Book
OrderItem.belongsTo(Book, { foreignKey: 'bookId' });
Book.hasMany(OrderItem, { foreignKey: 'bookId', as: 'orderItems' });

module.exports = {
  sequelize,
  User,
  Book,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
