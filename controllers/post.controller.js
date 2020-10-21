const Post = require('../models/post.model');
const Role = require('../_helpers/role');

exports.create = function (req, res) {
    const post = new Post({
      title: req.body.data.title,
      body: req.body.data.body,
      author: req.body.data.author,
      isPublished: req.body.data.isPublished
    });

    post.save()
      .then(function (createdPost) {
        return res.status(200).json({
          status: 200,
          data: createdPost,
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

  exports.get = function (req, res) {
    Post.findById(req.params.id)
      .then(function (post) {
        if (!post.isPublished && res.locals.user.role !== Role.Admin)
          return res.status(401).json({message: 'Unauthorized'})
        return res.status(200).json({
          status: 200,
          data: post,
          message: "Success"
        });
      })
      .catch(function (err) {
        return res.status(400).json({
          status: 400,
          message: err.message
        });
      });
  }

  exports.list = function (req, res) {
    Post.find()
      .then(function (posts) {
        if (res.locals.user.role !== Role.Admin) {
          posts = posts.filter(p => p.isPublished == true)
        }
        return res.status(200).json({
          status: 200,
          data: posts,
          message: 'Success'
        })
      })
      .catch(function (err) {
        return res.status(400).json({
          status: 400,
          message: err.message
        });
      });
  }

  exports.update = function (req, res) {
    Post.findById(req.params.id)
      .then(function (post) {
        post.title = req.body.data.title || post.title;
        post.body = req.body.data.body || post.body;
        post.author = req.body.data.author || post.author;
        post.date = req.body.data.date || post.date;
        post.isPublished = req.body.data.isPublished || post.isPublished;

        post.save()
          .then(function (updatedPost) {
            return res.status(200).json({
              status: 200,
              data: updatedPost,
              message: 'Success'
            });
          })
          .catch(function (err) {
            return res.status(400).json({
              status: 400,
              message: err.message
            });
          });
      })
      .catch(function (err) {
        return res.status(400).json({
          status: 400,
          message: err.message
        });
      });
  }

  exports.delete = function (req, res) {
    Post.findById(req.params.id)
      .then(function (post) {
        post.remove()
          .then(function (deletedPost) {
            return res.status(200).json({
              status: 200,
              data: deletedPost,
              message: 'Success'
            });
          })
          .catch(function (err) {
            return res.status(400).json({
              status: 400,
              message: err.message
            });
          });
      })
      .catch(function (err) {
        return res.status(400).json({
          status: 400,
          message: err.message
        });
      });
  }
  