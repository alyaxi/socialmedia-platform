const {post} = require("../models");
// const { Post } = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    const { content, picture, user_id } = req.body;
    const Post = await post.create({ content, picture, user_id });
    res.status(201).json(Post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const Posts = await post.findAll({ where: { user_id } });
    res.status(200).json(Posts);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};
// Add more controller methods for updating and deleting posts if needed
