const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware, postController.createPost);
router.get("/user/:user_id",authMiddleware, postController.getPostsByUser);
// Add more routes for updating and deleting posts if needed

module.exports = router;
