const slugify = require('slugify');

const Post = require('../models/post');

exports.create = (req, res) => {
  const { title, content, user, imageUrl } = req.body;

  const slug = slugify(title);

  // validate

  if (!title) {
    return res.status(400).json({
      error: 'Title is required',
    });
  }

  if (!content) {
    return res.status(400).json({
      error: 'Content is required',
    });
  }

  // create new post

  Post.create({ title, content, user, slug, imageUrl }, (err, post) => {
    if (err) {
      console.log(err);

      res.status(400).json({ error: 'Duplicate post' });
    }

    res.json(post);
  });
};

// list posts from database

exports.list = (req, res) => {
  Post.find({})
    .sort({ createdAt: -1 })
    .limit(2)
    .exec((err, posts) => {
      if (err) {
        console.log(err);
      }

      res.json(posts);
    });
};

// find post

exports.read = (req, res) => {
  const { slug } = req.params;

  console.log(req);

  Post.findOne({ slug }).exec((err, post) => {
    if (err) {
      console.log(err);
    }

    res.json(post);
  });
};

exports.update = (req, res) => {
  const { slug } = req.params;

  const { title, content, user, imageUrl } = req.body;

  Post.findOneAndUpdate(
    { slug },
    { title, content, user, imageUrl },
    { new: true }
  ).exec((err, post) => {
    if (err) {
      console.log(err);
    }

    res.json(post);
  });
};


exports.remove = (req, res) => {
  const { slug } = req.params;


  Post.findOneAndRemove(
    { slug }).exec((err, post) => {
    if (err) {
      console.log(err);
    }

    res.json({

      message:'Post deleted'

    });
  });
};
