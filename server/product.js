'use strict'

const Product = require('APP/db/models/product');
const router = require('express').Router();

module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next)
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(fetchedProduct => res.send(fetchedProduct))
    .catch(next)
});

