const Product = require('../models/Product'); 

// Fetching all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ data: { products } });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Fetching a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ data: { product } });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// Adding a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: { product } });
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error: error.message });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct
};