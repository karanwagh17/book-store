import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
  const navigate = useNavigate();
  const { bookId } = useParams(); 
  const [formData, setFormData] = useState({
    Title: '',
    Author: '',
    Description: '',
    Price: '',
    ISBN: ''
  });

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/book/getOneBook/${bookId}`);
          setFormData(response.data.book || {}); 
        } catch (err) {
          console.error('Failed to fetch book:', err);
          alert('Failed to fetch book details');
        }
      };
      fetchBook();
    }
  }, [bookId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bookId) {
        await axios.patch(`http://localhost:8080/api/book/updateBook/${bookId}`, formData);
      } else {
        await axios.post('http://localhost:8080/api/book/postBookData', formData);
      }
      navigate('/');
    } catch (err) {
      console.error('Failed to save book:', err);
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>{bookId ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="Author"
            value={formData.Author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            name="ISBN"
            value={formData.ISBN}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn primary">
          {bookId ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
