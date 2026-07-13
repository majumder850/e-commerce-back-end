const Order = require('../models/Order');
const Cart = require('../models/Cart');

// 1. Creating a new order
const createOrder = async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    const order = await Order.create({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount
    });

    // Clearing the user's cart after a successful order
    await Cart.findOneAndUpdate({ user: user }, { items: [] });

    res.status(201).json({ data: { order }, message: "Order placed successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error: error.message });
  }
};

// 2. Getting all orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Sorting by createdAt descending to show newest orders first
    const orders = await Order.find({ user: userId })
      .populate('orderItems.product')
      .populate('shippingAddress')
      .sort({ createdAt: -1 }); 

    res.status(200).json({ data: { orders } });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// 3. Getting a single order by its ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate('user', 'name email')
      .populate('orderItems.product')
      .populate('shippingAddress');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ data: { order } });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order details", error: error.message });
  }
};

// 4. Updating order status (Typically for Admin use)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    res.status(200).json({ data: { order }, message: "Order status updated" });
  } catch (error) {
    res.status(400).json({ message: "Error updating order status", error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
};