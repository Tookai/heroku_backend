const router = require("express").Router();

const postCtrl = require("../controllers/post");

//
// Create a new post
router.post("/post", postCtrl.createPost);

//
// Select all posts
router.get("/", postCtrl.selectAll);

//
// Select one post
router.get("/id/:id", postCtrl.selectOne);

//
// Select all posts by user
router.get("/user/:userId", postCtrl.selectByUser);

//
// Select all posts by topic
router.get("/topic/:topic", postCtrl.selectByTopic);

//
// Update one post
router.put("/update/:id", postCtrl.updateOne);

//
// Delete one post
router.delete("/delete/:id", postCtrl.deleteOne);

module.exports = router;
