const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;


let isConnected = false;

const initializeDatabase = async () => {
  
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    console.log("=> Creating new database connection");
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, 
    });
  
    isConnected = db.connections[0].readyState;
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to Database:", error.message);
    throw error; 
  }
};

module.exports = { initializeDatabase };