import React from "react";
import { Route, Routes } from "react-router-dom";
import BookDetails from "./src/Components/BookDetails";
import BookList from "./src/Components/BookList";
import BookForm from "./src/Components/BookForm"; // ✅ Make sure this is correctly imported

const Allroutes = () => {
  return (
    <Routes>
      {/* Homepage shows book list */}
       <Route path="/" element={<BookList />} />
      <Route path="/add-book" element={<BookForm />} />
      <Route path="/edit-book/:bookId" element={<BookForm />} />
      <Route path="/book-details/:bookId" element={<BookDetails />} />
    </Routes>
  );
};

export default Allroutes;
