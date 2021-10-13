const { Post, Like, Comment } = require("../models");
const fs = require("fs");

//
// Create a new post
exports.createPost = async (req, res) => {
  const post = req.body;
  const userId = post.userId;
  const desc = post.desc;
  const image = post.image;
  const topic = post.topic;
  try {
    if (userId == req.user.userId) {
      const newPost = await Post.create({ userId, desc, image, topic });
      res.status(200).json(newPost);
    } else {
      res.status(404).json(`Vous ne pouvez pas faire ça.`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Select all posts
exports.selectAll = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Select one post
exports.selectOne = async (req, res) => {
  try {
    const post = await Post.findAll({ where: { id: req.params.id } });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Select all posts by user
exports.selectByUser = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Select all posts by topic
exports.selectByTopic = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { topic: req.params.topic } });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Update one post
exports.updateOne = async (req, res) => {
  const p = req.body;
  const desc = p.desc;
  const image = p.image;
  const topic = p.topic;
  try {
    await Post.update(
      {
        desc,
        image,
        topic,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json("Le post a été mis à jour.");
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Delete one post
exports.deleteOne = async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    await Like.destroy({ where: { postId: req.params.id } });
    await Comment.destroy({ where: { postId: req.params.id } });
    res.status(200).json("Le post a été supprimé.");
  } catch (err) {
    res.status(500).json(err);
  }
};
