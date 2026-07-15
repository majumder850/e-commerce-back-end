const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  // Asking Mongoose its exact state. 1 = connected, 2 = connecting.
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    console.log("=> Using existing active database connection");
    return;
  }

  // Safety check
  if (!mongoUri) {
    console.error("CRITICAL ERROR: process.env.MONGODB is undefined!");
    throw new Error("Database URI missing. Check Vercel Environment Variables.");
  }

  try {
    console.log("=> Creating new database connection");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("CRITICAL: Error connecting to Database:", error.message);
    throw error; 
  }
};

module.exports = { initializeDatabase };