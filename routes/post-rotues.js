const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const errorHandler = require("../middleware/errorHandle");

router.post("/",authMiddleware, postController.createPost, errorHandler);
router.get("/user",authMiddleware, postController.getPostsByUser, errorHandler);
router.put("/update/:id",authMiddleware, postController.updatePostByUser, errorHandler);
router.delete("/delete/:id",authMiddleware, postController.deletePostByUser, errorHandler);
// Add more routes for updating and deleting posts if needed

module.exports = router;
