const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, createCategory } = require('../controllers/categoryCtrl');

router.get('/', getAllCategories);
router.get('/:categoryId', getCategoryById);
router.post('/', createCategory); 

module.exports = router;