const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongoose_delete = require("mongoose-delete");

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
mongoose.plugin(slug);
Course.plugin(mongoose_delete, { overrideMethods: "all" }, { deletedAt: true });
module.exports = mongoose.model("Course", Course);
