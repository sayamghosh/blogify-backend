const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
}

module.exports = dbConnect;