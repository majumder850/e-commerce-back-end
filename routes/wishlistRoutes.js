// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistCtrl');

// Get wishlist for a specific user
router.get('/:userId', getWishlist);

// Add an item to the wishlist (expecting userId and productId in the request body)
router.post('/', addToWishlist);

// Remove an item from the wishlist
router.delete('/:userId/:productId', removeFromWishlist);

module.exports = router;