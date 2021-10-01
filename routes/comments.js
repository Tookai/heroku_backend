const router = require("express").Router();
// ---------------------------------------
const commentCtrl = require("../controllers/comment");
// ---------------------------------------

//
// Create a new comment
router.post("/:postId/post/:userId", commentCtrl.createComment);

//
// Delete a comment
router.delete("/:postId/delete/:commentId", commentCtrl.deleteComment);

//
// Select all comment by post
router.get("/:postId/comments", commentCtrl.selectCommentByPost);

//
//
//
module.exports = router;
