const {post} = require("../models");
// const { Post } = require("../models/post");

exports.createPost = async (req, res, next) => {
  try {
    const { content, picture } = req.body;
    console.log(req, "request response user");
    const user_id = req.user_id;
    const Post = await post.create({ content, picture, user_id });
    res.status(201).json(Post);
  } catch (error) {
    // res.status(500).json({ error: error.message });
    next(error)
  }
};

exports.getPostsByUser = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const Posts = await post.findAll({ where: { user_id } });
    res.status(200).json(Posts);
  } catch (error) {
    // res.status(500).json({ error: error.message});
    next(error)
  }
};

exports.updatePostByUser = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const postID = req.params.id;
    const Posts = await post.findOne({
      where: {user_id, id:postID}
    });
    if(!Posts) return res.status(404).json({error: "Post not found"})
    const updatedPost = Posts.update(req.body)
    res.status(200).json({message: "Post updated Succesfully", updatedPost});
  } catch (error) {
    // res.status(500).json({ error: error.message});
    next(error)
  }
};

exports.deletePostByUser = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const postID = req.params.id;
    const Posts = await post.findOne({
      where: {user_id, id:postID}
    });
    const deletedPost = Posts.destroy()
    res.status(200).json({message: "your post has been deleted"});
  } catch (error) {
    // res.status(500).json({ error: error.message});
    next(error)
  }
};
// Add more controller methods for updating and deleting posts if needed
