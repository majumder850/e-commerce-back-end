// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistCtrl');

// Getting wishlist for a specific user
router.get('/:userId', getWishlist);

// Adding an item to the wishlist (expecting userId and productId in the request body)
router.post('/', addToWishlist);

// Removing an item from the wishlist
router.delete('/:userId/:productId', removeFromWishlist);

module.exports = router;