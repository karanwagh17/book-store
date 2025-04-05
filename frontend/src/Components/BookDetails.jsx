import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/book/getOneBook/${bookId}`);
        setBook(response.data.book); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="book-details">
      <h2>{book.Title}</h2>
      <p><strong>Author:</strong> {book.Author}</p>
      <p><strong>Price:</strong> ${book.Price}</p>
      <p><strong>Description:</strong> {book.Description}</p>
      <Link to="/" className="btn">Back to List</Link>
    </div>
  );
};

export default BookDetails;
