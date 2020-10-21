const userService = require('../service/user.service');
const Role = require('_helpers/role');
const User = require('../models/user.model');

exports.create = function (req, res) {
    const user = new User({
      id: req.body.data.id,
      username: req.body.data.username,
      password: req.body.data.password,
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      role: req.body.data.role
    });

    user.save()
      .then(function (createdUser) {
        return res.status(200).json({
          status: 200,
          data: createdUser,
          message: 'Success'
        });
      })
      .catch(function (err) {
        return res.status(400).json({
          status: 400,
          message: err.message
        });
      });
  }


exports.authenticate = function (req, res, next) {
    userService.authenticate(req.body)
        .then( user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

exports.getAll = function (req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

exports.getById = function (req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}