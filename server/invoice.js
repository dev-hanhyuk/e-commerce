'use strict'
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const STRIPE_SECRET_KEY = require('APP/app/components/payment/secret').STRIPE_API_KEY;

const STRIPE_API_KEY = 'sk_test_IcsA02UZPgK9wBLC6rCLjqVQ';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_89BWHaTW06t8GAYXHbiL0Qfx';
const STRIPE_SECRET_KEY = STRIPE_API_KEY;


const stripe = require('stripe')(process.env.STRIPE_API_KEY || STRIPE_API_KEY);

const Invoice = require('APP/db/models/invoice');
const Order = require('APP/db/models/order');
const Product = require('APP/db/models/product');

const router = require('express').Router();
module.exports = router;

router.get('/admin', (req, res, next) => {
  Invoice.findAll()
    .then(invoices => res.send(invoices))
    .catch(next)
});

router.post('/charge', (req, res, next) => {
  Invoice.create(req.body.invoice)
    .then(invoice => {
      return invoice.update({user_id: req.body.user.id})
        .then(() => {
          const updateOrderAndProductQuantity = req.body.orderIds.map(o => {
            return Order.findById(o)
              .then(order => order.update({ invoice_id: invoice.id, status: 'checked-out' }))
              .then(order => {
                return Product.findById(order.product_id)
                  .then(product => {
                    if (product.stocks >= order.quantity) return product.update({stocks: product.stocks - order.quantity});
                    else throw new Error('insufficient stocks');
                  })
                  .catch(() => res.send('insufficient stocks'))
              })
          })
          return Promise.all(updateOrderAndProductQuantity)
        })
        .then(() => {
          stripe.charges.create({
            card: req.body.stripeToken,
            currency: 'usd',
            amount: req.body.invoice.price
          }, (err, charge) => {
            res.sendStatus(200);
          })
        })
        .catch(next);
    })
    .catch(next);
});
