// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userCtrl');

// GET /api/users
router.get('/', (req, res) => {
  res.status(200).json({ message: "User API is running!" });
});

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

// GET /api/users/:userId
router.get('/:userId', getUserProfile);

module.exports = router;