const Book = require('../models/book.model');

const getBook = async (req, res) => {
    try {
        const { page, bookName, limit } = req.query;
        if (bookName && bookName.trim()) {
            const regex = new RegExp(bookName, "i");
            const searchBook = await Book.find({ bookName: regex });
            return res.status(200).json({
                message: "The book has been retrieved successfully",
                bookList: searchBook,
            });
        } 
        const pageCount = page || 1;  
        const limitDoc = limit || 10;
        const totalBooks = await Book.countDocuments({ status: true });
        const maxPage =
            totalBooks <= limitDoc ? 1 : Math.ceil(totalBooks / limitDoc);

        if (pageCount > maxPage)
            return res
                .status(400)
                .json({ message: `There are only ${maxPage} page` });

        const skip = (pageCount - 1) * limitDoc;

        const bookList = await Book
            .find({ status: true })
            .skip(skip)
            .limit(limitDoc)
            .exec();

        return res.status(200).json({
            message: "The book has been retrievedasdasd successfully",
            bookList: bookList,
        });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred. please try again later" });
    }
}

const createBook = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).json({ message: "please fill the details" });

        const { id } = req.user.data._id;
        const {
            bookName,
            bookDesc,
            noOfPages,
            bookAuthor,
            bookCategory,
            bookPrice,
            releasedYear,
            userId = id,
        } = req.body;

        const newBookData = {
            bookName,
            bookDesc,
            noOfPages,
            bookAuthor,
            bookCategory,
            bookPrice,
            releasedYear,
            userId,
        };

        const newBook = await Book.create(newBookData);
        if (!newBook)
            return res.status(400).json({ message: "The book could not be listed successfully" });

        return res.status(201).json({ message: "The book has been successfully created" });
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ message: "An error occurred. please try again later" });
    }
};

const updateBook = async (req,res) => {
    try {
        const {id} = req.params;

        const editBookDetails = await Book
        .findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!editBookDetails) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({
            message: "The book has been updated successfully",
            editBookDetails,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ errors });
          }
          return res.status(500).json({ message: bookMassage.error.genericError });      
    }
}

const findBook = async (req, res) => {
    try {
        const { id } = req.params;
        let bookDetails = await Book
            .findById(id)
            .populate("userId", "name -_id")
            .exec();
            bookDetails = [bookDetails];
        if (!bookDetails) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({
            message: "The book has been retrieved successfully",
            bookDetails,
        });

    } catch (err) {
        return res.status(500).json({ message: "An error occurred. please try again later"});
    }


}

const deleteBook = async (req,res) => {
    try {
        const {id} = req.params;
        const deletebook = await Book.findByIdAndDelete(id);
        if(!deleteBook) return res.status(404).json({message:"Book not found"});
        return res.status(200).json({
            message:"The book has been deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({message:"An error occurred. please try again later"});
    }
}

module.exports = { createBook, getBook, updateBook, findBook, deleteBook }