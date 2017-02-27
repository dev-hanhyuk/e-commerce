'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Order = db.define('orders', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    status: Sequelize.ENUM(['processing', 'wishlist', 'checked-out', 'shipped', 'completed'])
},{
    instanceMethods: {},
    classMethods: {},
    hooks: {}
});

module.exports = Order;
