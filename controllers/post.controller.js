const Post = require("../models/Post");

// create post
exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({ userId: req.user.id, title, description });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name email");
    res.json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// update status of post
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

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, description, status } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      { title, description, status, updatedAt: Date.now() },
      { new: true }
    );

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get a single post by postId
exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("userId", "name email");

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get posts by userId
exports.getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).populate("userId", "name email");

    res.json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
