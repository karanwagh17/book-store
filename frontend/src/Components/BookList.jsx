import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/BookList.css"

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/book/getAllBooks');
      setBooks(response.data.books);
    console.log(response.data.books)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/book/deleteOneBook/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="book-list">
      <h2>Book List</h2>
      <Link to="/add-book" className="btn">Add New Book</Link>
      
      <div className="books-grid">
        {books.map(book => (
          <div key={book._id} className="book-card">
            <h3>{book.Title}</h3>
            <p>Author: {book.Author}</p>
            <p>Price: ${book.Price}</p>
            <div className="actions">
              <Link to={`/book-details/${book._id}`} className="btn">View</Link>
              <Link to={`/edit-book/${book._id}`} className="btn">Edit</Link>
              <button 
                onClick={() => handleDelete(book._id)}
                className="btn danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;