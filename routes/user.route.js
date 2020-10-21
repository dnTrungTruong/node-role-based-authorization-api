const express = require('express');
const authorize = require('../_helpers/authorize')
const UserCtrl = require('../controllers/users.controller')
const Role = require('../_helpers/role');

const router = express.Router();

// routes
router.post('/register', UserCtrl.create)
router.post('/authenticate', UserCtrl.authenticate);     // public route
router.get('/', authorize(Role.Admin), UserCtrl.getAll); // admin only
router.get('/:id', authorize(), UserCtrl.getById);       // all authenticated users
module.exports = router;