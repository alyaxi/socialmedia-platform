const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/profile', authMiddleware, userController.getUserProfile);

// Add other user-related routes

module.exports = router;
