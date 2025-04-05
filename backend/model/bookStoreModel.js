const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Author: { type: String, required: true },
  Price: { type: Number, required: true },
  Description: { type: String, required: true },
  ISBN: { type: String },
});

const BookModel = mongoose.model("Book", BookSchema);
module.exports = BookModel;
