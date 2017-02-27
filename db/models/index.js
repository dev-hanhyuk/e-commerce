'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Invoice = require('./invoice')


Order.belongsTo(User);
User.hasMany(Order);

Order.belongsTo(Product);

Order.belongsTo(Invoice);
Invoice.hasMany(Order);

Invoice.belongsTo(User);
User.hasMany(Invoice);



module.exports = { User, Product, Order, Invoice };
