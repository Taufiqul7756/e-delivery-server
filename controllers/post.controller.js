const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({ userId: req.user.id, title, description });
    await post.save();
    res.status(201).send("Post created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name email");
    res.json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updatePostStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const { status } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
