const Cart = require('../models/Cart');

// 1. Fetching a user's cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
     
      return res.status(200).json({ data: { cart: { user: userId, items: [] } } });
    }

    res.status(200).json({ data: { cart } });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

// 2. Adding an item to the cart (or update quantity)
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Creating a new cart if it doesn't exist
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      // Checking if the product is already in the cart
      const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        // Increment quantity if it exists
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item if it doesn't exist
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    await cart.populate('items.product');
    res.status(200).json({ data: { cart }, message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

// 3. Remove an item from the cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Filter out the item to be removed
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      await cart.save();

      await cart.populate('items.product');
      res.status(200).json({ data: { cart }, message: "Item removed from cart" });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error: error.message });
  }
};

// 4. Update item quantity directly 
const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                await cart.save();
                await cart.populate('items.product');
                return res.status(200).json({ data: { cart }, message: "Cart updated" });
            }
        }
        res.status(404).json({ message: "Item not found in cart" });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error: error.message });
    }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity
};