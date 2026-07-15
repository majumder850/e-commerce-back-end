const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

// Track connection globally for Vercel serverless functions
let isConnected = false; 

const initializeDatabase = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  // Safety check to prevent silent crashes
  if (!mongoUri) {
    console.error("CRITICAL ERROR: process.env.MONGODB is undefined!");
    throw new Error("Database URI missing. Check Vercel Environment Variables.");
  }

  try {
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    
    isConnected = db.connections[0].readyState;
    console.log("Connected to Database");
  } catch (error) {
    console.error("CRITICAL: Error connecting to Database:", error.message);
    throw error;
  }
};

module.exports = { initializeDatabase };