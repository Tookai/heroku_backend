const { Like } = require("../models");
const { Post } = require("../models");
const { User } = require("../models");

//
// Add one like
exports.addLike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  try {
    await Like.create({ postId, userId });
    res.status(200).json(`User ${userId} liked post ${postId}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Remove one like
exports.removeLike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  try {
    await Like.destroy({ where: { postId, userId } });
    res.status(200).json(`User ${userId} disliked post ${postId}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Select like by post and return who liked
exports.selectUsersLikeByPost = async (req, res) => {
  try {
    const likes = await Like.findAll({ where: { postId: req.params.postId } });
    const userId = likes.map((u) => u.userId);
    const user = await User.findAll({ where: { id: userId } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
