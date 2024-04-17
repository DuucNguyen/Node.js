const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            serverSelectionTimeoutMS: 30000,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

module.exports = { connect };
