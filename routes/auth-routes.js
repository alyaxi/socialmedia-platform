const express = require("express");
const authController = require("../controllers/authController");


const router = express.Router()

router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Refresh token route
router.post('/refresh-token', authController.refreshToken);

router.delete('/refresh-token', authController.deleteRefreshTOken);

module.exports = router;