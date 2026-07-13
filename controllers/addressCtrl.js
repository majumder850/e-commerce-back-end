const Address = require('../models/Address');

// 1. Adding a new address
const addAddress = async (req, res) => {
  try {
    const { user, street, city, state, zipCode, country, isDefault } = req.body;

    // If this new address is set as default, then unsetting any existing default addresses for this user
    if (isDefault) {
      await Address.updateMany({ user }, { isDefault: false });
    }

    const address = await Address.create({
      user, street, city, state, zipCode, country, isDefault
    });

    res.status(201).json({ data: { address }, message: "Address added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error adding address", error: error.message });
  }
};

// 2. Fetching all addresses for a specific user
const getUserAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ user: userId });

    res.status(200).json({ data: { addresses } });
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses", error: error.message });
  }
};

// 3. Updating an existing address
const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const updateData = req.body;

    // If updating to default, unsetting others first
    if (updateData.isDefault) {
      const addressToUpdate = await Address.findById(addressId);
      if (addressToUpdate) {
        await Address.updateMany({ user: addressToUpdate.user }, { isDefault: false });
      }
    }

    const address = await Address.findByIdAndUpdate(
      addressId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ data: { address }, message: "Address updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating address", error: error.message });
  }
};

// 4. Deleting an address
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findByIdAndDelete(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address", error: error.message });
  }
};

module.exports = {
  addAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress
};