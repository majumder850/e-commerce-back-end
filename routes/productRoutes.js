const express = require('express');
const router = express.Router();


const { getAllProducts, getProductById, createProduct } = require('../controllers/productCtrl'); 


router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.post('/', createProduct);

module.exports = router;