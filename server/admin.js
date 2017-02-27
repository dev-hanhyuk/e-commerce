'use strict'

const User = require('APP/db/models/user');
const Order = require('APP/db/models/order');
const Product = require('APP/db/models/product');
const fs = require('fs');
const { resolve } = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'images/') },
  filename: (req, file, cb) => { cb(null, '/' + Number(new Date()) + '.' + file.mimetype.split('/')[1]) }
})
const upload = multer({ storage: storage });
const router = require('express').Router();
module.exports = router;


router.post('/product/upload', upload.single('image'), (req, res, next) => {
  // console.log(req.file);
  res.send(req.file.filename);
})


router.post('/product/add', (req, res, next) => {
  Product.create(req.body)
    .then(createdProduct => res.send(createdProduct))
    .catch(next);
})

router.post('/product/removeImage', (req, res, next) => {
  const uploadPath = resolve(__dirname, '..', 'images');
  fs.unlink(`${uploadPath}${req.body.path}`, (err) => {
    if (err) { return console.error(err) }
    console.log(`${req.body.path} has been deleted successfully`);
    res.send(204);
  })
})

router.post('/product/remove/:pid', (req, res, next) => {
  Product.destroy({where: { id: req.params.pid }})
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.put('/product/update/:pid', (req, res, next) => {
  console.log(req.body);
  Product.findById(req.params.pid)
    .then(product => product.update(req.body))
    .then(updatedProduct => res.send(updatedProduct))
    .catch(next)
})