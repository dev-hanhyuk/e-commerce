'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

module.exports = db.define('products', {
    name: Sequelize.TEXT,
    description: Sequelize.TEXT,
    category: Sequelize.ENUM('Clothes', 'Shoes', 'Jewelry', 'Bag', 'Accessory'),
    subCategory: Sequelize.ENUM('Dress', 'Casual', 'Costume'),
    gender: Sequelize.ENUM('Male', 'Female'),
    size: Sequelize.ENUM('XS','S', 'M', 'L', 'XL'),
    color: Sequelize.STRING,
    imageUrl: Sequelize.ARRAY(Sequelize.STRING),
    price: Sequelize.FLOAT,
    stocks: Sequelize.INTEGER
},{
    instanceMethods: {},
    classMethods: {},
    hooks: {}
})
