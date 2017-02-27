'use strict'

const User = require('APP/db/models/user');
const Order = require('APP/db/models/order');
const Product = require('APP/db/models/product');

const router = require('express').Router();
module.exports = router;

router.get('/admin', (req, res, next) => {
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next)
})

router.get('/wishlist/:userId', (req, res, next) => {
  Order.findAll({
    where: { user_id: req.params.userId, status: 'wishlist' },
    include: [{ model: Product }]
  })
    .then(orders => res.send(orders))
    .catch(next);
})


router.get('/history/:userId', (req, res, next) => {
  Order.findAll({
    where: { user_id: req.params.userId, $or: [{status: 'completed'}, {status: 'checked-out'}] },
    include: [{ model: Product }]
  })
    .then(orders => res.send(orders))
    .catch(next);
})


router.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: { user_id: req.params.userId, status: 'processing' },
    include: [{ model: Product }]
  })
    .then(orders => res.send(orders))
    .catch(next);
})


router.put('/wishlist', (req, res, next) => {
  const checkoutToWishlist = req.body.orders.map(order => {
    Order.findOne({
      where: {
        status: 'wishlist',
        product_id: order.product_id,
        user_id: req.body.user.id
      }
    })
      .then(fetchedOrder => {
        if (fetchedOrder) {
          return fetchedOrder.update({ quantity: fetchedOrder.quantity + order.quantity })
            .then(() => Order.destroy({ where: { id: order.id }}))
        } else {
          return Order.update({ status: 'wishlist' }, { where: { id: order.id }})
        }
      })
  });

  Promise.all(checkoutToWishlist)
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.put('/checkout', (req, res, next) => {
  const wishlistToCheckout = req.body.orders.map(order => {
    Order.findOne({
      where: {
        status: 'processing',
        product_id: order.product_id,
        user_id: req.body.user.id
      }
    })
      .then(fetchedOrder => {
        if (fetchedOrder) {
          return fetchedOrder.update({ quantity: fetchedOrder.quantity + order.quantity })
            .then(() => Order.destroy({ where: { id: order.id }}))
        } else {
          return Order.update({ status: 'processing' }, { where: { id: order.id }})
        }
      })
  });

  Promise.all(wishlistToCheckout)
    .then(() => res.sendStatus(204))
    .catch(next);
})


router.post('/remove', (req, res, next) => {
  const removeOrders = req.body.orders.map(oId => Order.destroy({ where: { id: oId }}));
  Promise.all(removeOrders)
    .then(() => res.sendStatus(204))
    .catch(next);
});


router.post('/wishlist/product', (req, res, next) => {
  Order.findOrCreate({
    where: {
      status: 'wishlist',
      user_id: req.body.userId,
      product_id: req.body.productId
    }
  })
    .spread((order, isCreated) => order.update(
      { quantity: order.quantity + req.body.quantity }))
    .then(order => res.send(order))
    .catch(next);
})

router.post('/orderhistory', (req, res, next) => {
  const orderHistoryToCart = req.body.orders.map(order => {
    Order.findOrCreate({
    where: {
      status: 'processing',
      user_id: order.user_id,
      product_id: order.product_id,
    }})
    .spread((o, isCreated) => o.update({
      quantity: o.quantity + order.quantity
    }))
  })

  Promise.all(orderHistoryToCart)
    .then(order => res.send(order))
    .catch(next);
})

router.post('/:userId', (req, res, next) => {
  Order.findOrCreate({
    where: {
      status: req.body.status,
      user_id: req.params.userId,
      product_id: req.body.productId
    }
  })
    .spread((order, isCreated) => order.update({ quantity: order.quantity + req.body.quantity }))
    .then(order => res.send(order))
    .catch(next);
});

