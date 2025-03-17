const mongoose = require("mongoose");
require('dotenv').config();

let isConnected = false; // Track if we are connected

async function connectDB() {
  if (isConnected) {
    console.log("🔄 Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {}); // Removed deprecated options

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

module.exports = connectDB;
