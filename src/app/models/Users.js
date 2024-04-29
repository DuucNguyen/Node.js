const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, maxLength: 25, required: true },
        password: { type: String, maxLength: 25, required: true },
        email: { type: String },
        phone: { type: String },
        courses: { type: [Number]},
        role: { type: String },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    },
);

UserSchema.plugin(mongoose_delete, { overrideMethods: "all", deletedAt: true }); //plugin soft delete
module.exports = mongoose.model("User", UserSchema);
