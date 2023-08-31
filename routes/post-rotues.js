const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);
router.get("/user/:user_id", postController.getPostsByUser);
// Add more routes for updating and deleting posts if needed

module.exports = router;
