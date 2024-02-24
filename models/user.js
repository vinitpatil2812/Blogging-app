const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    salt: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    profileImage: {
        type: String,
        default: "/images/default.jpg",
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",    
    },
}, { timestamps: true });

const User = model("user", userSchema);

userSchema.pre("save", function(next) {
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

module.exports = User;