const express = require('express');
const authorize = require('../_helpers/authorize')
const PostCtrl = require('../controllers/post.controller');
const Role = require('../_helpers/role');

const router = express.Router();

router.get('/', authorize(), PostCtrl.list);
router.get('/:id', authorize(), PostCtrl.get);
router.post('/', authorize(Role.Admin), PostCtrl.create);
router.put('/:id', authorize(Role.Admin), PostCtrl.update);
router.delete('/:id', authorize(Role.Admin), PostCtrl.delete);

module.exports = router;