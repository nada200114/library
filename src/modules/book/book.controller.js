import bookModel from "../../../db/models/book.model.js";
import authorModel from "../../../db/models/author.model.js";

// Get all books
export const getAllBooks = async (req, res, next) => {
    try {
        const books = await bookModel.find();
        res.status(200).json({ msg: "done", books });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};

// Create book 
export const createBook = async (req, res, next) => {
    const { title, content, author } = req.body;
    try {
        const authorDoc = await authorModel.findById(author);
        if (!authorDoc) {
            return res.status(404).json({ msg: "Author doesn't exist" });
        }
        
        const book = await bookModel.create({ title, content, author, authorName: authorDoc.name });
        // Add book to a specific author
        await authorModel.findByIdAndUpdate(author, { $push: { books: book._id } });
        res.status(200).json({ msg: "done", book });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};

// Retrieve a specific book by its id
export const getBookById = async (req, res, next) => {
    try {
        const book = await bookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: "Book doesn't exist" });
        }
        res.status(200).json({ msg: "done", book });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};

// Update a specific book by its id
export const updateBookById = async (req, res, next) => {
    try {
        const book = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ msg: "Book doesn't exist" });
        }
        res.status(200).json({ msg: "done", book });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};


// Delete a specific book by its id
export const deleteBookById = async (req, res, next) => {
    try {
        const book = await bookModel.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: "Book doesn't exist" });
        }
        await authorModel.findByIdAndUpdate(book.author, { $pull: { books: book._id } });
        res.status(200).json({ msg: "Deleted", book });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};