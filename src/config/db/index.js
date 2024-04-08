const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/Nodejs_Online_Courses_dev",
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

module.exports = { connect };
