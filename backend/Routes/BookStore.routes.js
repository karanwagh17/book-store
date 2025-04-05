const express = require("express");
const {
  postBookData,
  getAllBooks,
  deleteOneBook,
  updateBook,
  getOneBook
} = require("../controller/BookStore.controller,");

const BookRouter = express.Router();

BookRouter.post("/postBookData", postBookData);
BookRouter.get("/getAllBooks", getAllBooks);
BookRouter.get("/getOneBook/:bookId", getOneBook);

BookRouter.delete("/deleteOneBook/:bookId", deleteOneBook);

BookRouter.patch("/updateBook/:bookId", updateBook);

module.exports = BookRouter;
