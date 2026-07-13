const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderCtrl');

// Creating a new order
router.post('/', createOrder);

// Getting all orders for a specific user
router.get('/user/:userId', getUserOrders);

// Getting a specific order by ID
router.get('/:orderId', getOrderById);

// Updating order status 
router.put('/:orderId/status', updateOrderStatus);

module.exports = router;