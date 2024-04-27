const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const imgPath = "/uploads/user";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a user name'],
        trim: true,
        minlength: [3, 'User name must be at least 3 characters'],
        maxlength: [11, 'User name cannot exceed 11 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Please select a gender']
    },
    interest: [String],
    img: {
        type: String,
        required: [true, 'Please provide an image']
    }
});

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", imgPath));
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + extension);
    }
});

userSchema.statics.uploadImgPath = multer({ storage: imageStorage }).single("img");
userSchema.statics.imgPath = imgPath;

userSchema.index({ email: 1, password: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
