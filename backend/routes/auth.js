const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Get Current User
router.get('/me', protect, getMe);

module.exports = router;
