const router = require("express").Router();
// ---------------------------------------
const likeCtrl = require("../controllers/like");
// ---------------------------------------

//
// Add one like
router.post("/:postId/like/:userId", likeCtrl.addLike);

//
// Remove one like
router.delete("/:postId/dislike/:userId", likeCtrl.removeLike);

//
// Select like by post and return who liked
router.get("/:postId/who", likeCtrl.selectUsersLikeByPost);

//
//
//
module.exports = router;
