// controllers/userCtrl.js
const User = require('../models/User');

// 1. Registering a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        
        // Checking if a user with this email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const user = await User.create({ name, email, password, phone });
        res.status(201).json({ data: { user }, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// 2. Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Finding user by email
        const user = await User.findOne({ email });

        // Validate password
        if (user && user.password === password) {
            res.status(200).json({ data: { user }, message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// 3. Getting user profile by ID
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ data: { user } });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};