const { Comment } = require("../models");
const { Post } = require("../models");

//
// Create a new comment
exports.createComment = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  const content = req.body.content;
  try {
    const comment = await Comment.create({ postId, userId, content });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Delete a comment
exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const postId = req.params.postId;
  try {
    await Comment.destroy({ where: { id: commentId } });
    res.status(200).json(`Commentaire ${commentId} supprimé.`);
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// Select all comment by post
exports.selectCommentByPost = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { postId: req.params.postId } });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};
