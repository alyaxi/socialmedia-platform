const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const errorHandler = require("../middleware/errorHandle");

const router = express.Router();

router.get("/profile", authMiddleware, userController.getUserProfile, errorHandler);

// Add other user-related routes

module.exports = router;
