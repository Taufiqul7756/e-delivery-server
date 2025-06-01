const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, postController.createPost);
router.get("/", postController.getPosts);
router.put("/:postId/status", auth, postController.updatePostStatus);
router.put("/:postId", auth, postController.updatePost); // Update a post
router.get("/:postId", auth, postController.getPostById); // Get a single post by postId
router.get("/user/:userId", auth, postController.getPostsByUserId); // Get posts by userId
router.get("/own/posts", auth, postController.getOwnPosts); // New route for getting own posts

module.exports = router;
