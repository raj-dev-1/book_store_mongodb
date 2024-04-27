const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    bookName: {
        type: String,
        min: [3, "The book name is too short."],
        max: [30, "The book name is too long."],
        required: [true, "Please enter the name of the book."],
        require: true
    },
    bookDesc: {
        type: String,
        required: [true, "Please provide a description of the book."],
        trim: true,
    },
    noOfPages: {
        type: Number,
        required: [true, "Please enter the number of pages in the book."],
    },
    bookAuthor: {
        type: String,
        min: [3, "The author name is too short."],
        max: [20, "The author name is too long."],
        required: [true, "Please provide the name of the author of the book."],
        trim: true,
    },
    bookCategory: {
        type: String,
        min: [3, "The category name is too short."],
        max: [15, "The category name is too long."],
        required: [true, "Please provide the name of the category."],
        trim: true,
    },
    bookPrice: {
        type: Number,
        required: [true, "Please enter the price of the book."],
    },
    releasedYear: {
        type: Number,
        length: [4, "Please enter the correct release year of the book in the format: YYYY."],
        required: [true, "Please enter the year in which the book was released."],
    },
    status: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;