'use strict'

const User = require('APP/db/models/user');
const router = require('express').Router();

module.exports = router;


router.put('/password/:userId', (req, res, next) => {
  //req.body.currentPassword, req.body.newPassword
  console.log(req.body.currentPassword, req.body.newPassword)
  User.findById(req.params.userId)
    .then(user => {
      return user.authenticate(req.body.currentPassword)
        .then(ok => {
          console.log(ok);
          if (!ok) throw new Error('current password match error');
          else return user.update({ password: req.body.newPassword })
            .then(() => res.sendStatus(204))
            .catch(next)
        })
      })
    .catch(next)
})


router.post('/register', (req, res, next) => {
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => res.status(201).send(user))
    .catch(next)
});
