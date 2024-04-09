const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);
const Course = new mongoose.Schema(
    {
        name: { type: String, maxLength: 255, require: true },
        description: { type: String, maxLength: 255 },
        image: { type: String, maxLength: 255 },
        videoID: { type: String, maxLength: 255, require: true },
        slug: { type: String, slug: "name", unique: true },
        level: { type: String },

        // createdDate: { type: Date, default: Date.now },
        // updatedDate: { type: Date, default: Date.now }, -> { timestamps: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Course", Course);
