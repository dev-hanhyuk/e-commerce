'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');


const Invoice = db.define('invoices', {
  shipping: Sequelize.JSON,
  billing: Sequelize.JSON,
  payment: Sequelize.JSON,
  price: Sequelize.FLOAT
}, {
  instanceMethods: {},
  classMethods: {},
  hooks: {}
});


module.exports = Invoice;
