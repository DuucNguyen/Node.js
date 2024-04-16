const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongoose_delete = require("mongoose-delete");

const CourseSchema = new mongoose.Schema(
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

//Custom helper //Mongoose query helper (re-use method)
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty("_sort")) {
        const isValidType = ["asc", "desc"].includes(req.query.type); //valid req params
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : "desc", //condition : [column name] : order
        });
    }
    return this;
};

//Add plugin
mongoose.plugin(slug);
CourseSchema.plugin(mongoose_delete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("Course", CourseSchema);
