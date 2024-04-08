const mongoose = require("mongoose");
const Course = new mongoose.Schema({
    name: { type: String, maxLength: 255, default: "Course" },
    description: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", Course);
