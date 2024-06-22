import authorModel from "../../../db/models/author.model.js";

// Get all authors 
export const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await authorModel.find();
        res.status(200).json({ msg: "done", authors });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};

// Add an author 
export const createAuthor = async (req, res, next) => {
    const { name, bio, birthDate } = req.body;
    try {
        const author = await authorModel.create({ name, bio, birthDate });
        res.status(200).json({ msg: "done", author });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};

// Retrieve a specific author by its id    
export const getAuthorById = async (req, res, next) => {
    try {
        const author = await authorModel.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ msg: "Author doesn't exist" });
        }
        res.status(200).json({ msg: "done", author });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};

// Update an author by its id
export const updateAuthorById = async (req, res, next) => {
    try {
        const author = await authorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) {
            return res.status(404).json({ msg: "Author doesn't exist" });
        }
        res.status(200).json({ msg: "done", author });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};



// Retrieve a specific author by its ID (with populated books)
export const authorWithPopulatedBooks = async (req, res, next) => {
    try {
        const author = await authorModel.findById(req.params.id).populate('books');
        if (!author) {
            return res.status(404).json({ msg: "Author doesn't exist" });
        }
        res.status(200).json({ msg: "done", author });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};


// Delete a specific author by its id
export const deleteAuthorById = async (req, res, next) => {
    try {
        const author = await authorModel.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({ msg: "Author doesn't exist" });
        }
        // Remove all books linked to  this author
        await bookModel.deleteMany({ author: author._id });
        res.status(200).json({ msg: "Deleted", author });
    } catch (err) {
        res.status(500).json({ msg: "server error", err });
    }
};