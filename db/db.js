const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("=> Using existing active database connection");
    return;
  }

  if (!mongoUri) {
    console.error("CRITICAL ERROR: process.env.MONGODB is undefined!");
    throw new Error("Database URI missing. Check Vercel Environment Variables.");
  }

  try {
    console.log("=> Establishing database connection...");
    // Await guarantees Express will not move forward until this is done
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