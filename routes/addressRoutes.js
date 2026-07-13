const express = require('express');
const router = express.Router();
const {
  addAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress
} = require('../controllers/addressCtrl');

// Adding a new address
router.post('/', addAddress);

// Fetching all addresses for a specific user
router.get('/:userId', getUserAddresses);

// Updating a specific address by its ID
router.put('/:addressId', updateAddress);

// Deleting a specific address by its ID
router.delete('/:addressId', deleteAddress);

module.exports = router;