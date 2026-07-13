const express = require('express');
const router = express.Router();
const { 
  getCart, 
  addToCart, 
  removeFromCart, 
  updateCartItemQuantity 
} = require('../controllers/cartCtrl');

// Getting a user's cart
router.get('/:userId', getCart);

// Adding an item to the cart
router.post('/', addToCart);

// Updating an item's quantity in the cart
router.put('/', updateCartItemQuantity);

// Removing a specific item from the cart
router.delete('/:userId/:productId', removeFromCart);

module.exports = router;