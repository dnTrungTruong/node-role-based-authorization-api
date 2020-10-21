const express = require('express');
const postRoutes = require('./post.route');
const userRoutes = require('./user.route')
const router = express.Router();

router.get('/', function (req, res) {
  res.send('API works!');
});

router.use('/posts', postRoutes);
router.use('/users', userRoutes)
module.exports = router;