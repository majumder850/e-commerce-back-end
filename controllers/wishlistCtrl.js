// controllers/wishlistCtrl.js
const Wishlist = require('../models/Wishlist');

// 1. Fetch a user's wishlist
const getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        // Populate replaces the product IDs with the actual product data
        const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
        
        if (!wishlist) {
            return res.status(200).json({ data: { products: [] } }); // Return empty array if no wishlist exists yet
        }
        
        res.status(200).json({ data: { wishlist } });
    } catch (error) {
        res.status(500).json({ message: "Error fetching wishlist", error: error.message });
    }
};

// 2. Add a product to the wishlist
const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        
        // Find the user's wishlist
        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            // If it doesn't exist, create a new one
            wishlist = await Wishlist.create({ user: userId, products: [productId] });
        } else {
            // If it exists, check if the product is already in it
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
                await wishlist.save();
            }
        }
        
        // Populate the products before sending the response back
        await wishlist.populate('products');
        res.status(200).json({ data: { wishlist }, message: "Product added to wishlist" });
    } catch (error) {
        res.status(500).json({ message: "Error adding to wishlist", error: error.message });
    }
};

// 3. Remove a product from the wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            // Filter out the product ID that needs to be removed
            wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
            await wishlist.save();
            
            await wishlist.populate('products');
            res.status(200).json({ data: { wishlist }, message: "Product removed from wishlist" });
        } else {
            res.status(404).json({ message: "Wishlist not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error removing from wishlist", error: error.message });
    }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist
};