const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, postController.createPost);
router.get("/", auth, postController.getPosts);
router.put("/:postId/status", auth, postController.updatePostStatus);

module.exports = router;
