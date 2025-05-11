import React, { useState } from 'react';
import { Menu4 } from '../Components/menu1';
import axios from 'axios';
import Rating from 'react-rating'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../Components/Footer'

function CustomerReview() {
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [file, setFile] = useState(null); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('reviewTitle', reviewTitle);
    formData.append('reviewMessage', reviewMessage);
    formData.append('rating', rating);
    if (file) {
      formData.append('image', file); 
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('You must be logged in to submit a review.');
        return;
      }

      const response = await axios.post(
        'http://localhost:2000/user/createreview',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // This is important for file uploads
          },
        }
      );

      console.log(response.data);
      setSuccessMessage('Thanks for your feedback!');
      setErrorMessage('');
      setReviewTitle('');
      setReviewMessage('');
      setRating(1);
      setFile(null); // Reset file input after submission
    } catch (error) {
      console.error(error);
      setSuccessMessage('');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <Menu4 />
      <div className="userReview">
        <h1>Enjoyed Your Visit? Tell Us All About It!</h1>

        <form onSubmit={handleSubmit} className="reviewForm">
          <input
            type="text"
            placeholder="Title your review (e.g., Amazing Coffee!)"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your thoughts here..."
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            required
          ></textarea>
           <div>
          <p>Rate your experience:</p>
          <Rating
  initialRating={rating}
  onChange={(rate) => setRating(rate)}
  emptySymbol={<i className="far fa-star fa-2x" style={{ color: '#ccc' }} />}
  fullSymbol={<i className="fas fa-star fa-2x" style={{ color: '#FFD700' }} />}
/>

        </div>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <button type="submit">Submit Review</button>
        </form>

        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
      <Footer/>
    </div>
  );
}

export default CustomerReview;
