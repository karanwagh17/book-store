const BookModel = require("../model/bookStoreModel");

const postBookData = async (req, res) => {
  const { Title, Author, Price, Description, ISBN } = req.body;
  console.log(Title, Author, Price, Description)

  if (!Title || !Author || !Price || !Description) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const bookData = await BookModel.create({
      Title,
      Author,
      Price,
      Description,
      ISBN,
    });
    return res.status(200).json({ message: "Book added successfully", bookData });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    return res.status(200).json({ message: "Books fetched successfully", books });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteOneBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const data = await BookModel.findByIdAndDelete(bookId);
    if (!data) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book deleted successfully", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  const { bookId } = req.params;


  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided to update" });
  }

  try {
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getOneBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book fetched successfully", book });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


  module.exports = { postBookData, getAllBooks, deleteOneBook, updateBook ,getOneBook};
