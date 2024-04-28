const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongoose_delete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const path = require("path");
const imageBasePath = "/uploads/courseImages"; //set path to all uploaded file image 

const CourseSchema = new mongoose.Schema(
    {
        _id: { type: Number },
        name: { type: String, maxLength: 255, required: true },
        description: { type: String, maxLength: 500 },
        imagePath: { type: String, maxLength: 255, required: true },
        videoID: { type: String, maxLength: 255, required: true },
        slug: { type: String, slug: "name", unique: true },
        level: { type: String },
        // createdDate: { type: Date, default: Date.now },
        // updatedDate: { type: Date, default: Date.now }, -> { timestamps: true },
    },
    {
        _id: false,
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    },
);


CourseSchema.plugin(AutoIncrement); //auto incease _id (default)

//Custom helper //Mongoose query helper (re-use method)
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty("_sort")) {
        // console.log("Schema-hasOwnProperty(_sort): "+ req.query.hasOwnProperty("_sort"));
        // console.log("Schema-column: "+ req.query.column);
        // console.log("Schema-type: "+ req.query.type);

        const isValidType = ["asc", "desc"].includes(req.query.type); //valid req params
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : "desc", //condition : [column name] : order
        });
    }
    return this;
};

CourseSchema.virtual("actualImagePath").get(function () {
    if (this.imagePath != null) {
        return path.join(imageBasePath, this.imagePath);
    }else{
        return null;
    }
});

//Add plugin
mongoose.plugin(slug);
CourseSchema.plugin(mongoose_delete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("Course", CourseSchema);
