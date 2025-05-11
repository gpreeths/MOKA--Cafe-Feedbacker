import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from 'react-rating';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Menu5 } from '../Components/menu1';

function FullImageView() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedReply, setSuggestedReply] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReview();
  }, [id]);

  const fetchReview = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`http://localhost:2000/admin/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReview(response.data);
    } catch (error) {
      setError('Failed to fetch review');
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      await axios.post(
        `http://localhost:2000/admin/reply/${id}`,
        { reviewReply: replyText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReplyText('');
      fetchReview(); // Refresh with new reply
    } catch (error) {
      setError('Failed to submit reply');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestReply = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(
        `http://localhost:2000/admin/suggest-reply`,
        { reviewMessage: review?.reviewMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuggestedReply(response.data.suggestedReply);
    } catch (error) {
      setError('Failed to get AI reply suggestion');
    }
  };

  return (
    <>
    <Menu5/>
    <div className="fullImageView">
      
      {error && <p className="error">{error}</p>}
      {review ? (
        <div>
          <h1>{review.reviewTitle}</h1>
          <p>{review.reviewMessage}</p>

          <div style={{ marginBottom: '1rem' }}>
            <strong>Rating: </strong>
            <Rating
              initialRating={review.rating}
              readonly
              emptySymbol={<i className="far fa-star" style={{ color: '#ccc', fontSize: '20px' }}></i>}
              fullSymbol={<i className="fas fa-star" style={{ color: '#FFD700', fontSize: '20px' }}></i>}
            />
          </div>

          {review.image && (
            <img
              src={`http://localhost:2000/${review.image.replace(/^\/+/, '')}`}
              alt="Full Size Review"
              style={{ maxWidth: '40%', maxHeight: '40%', marginBottom: '1rem' }}
            />
          )}

          {/* AI Suggestion Button */}
          <button onClick={handleSuggestReply} style={{ marginTop: '1rem' }}>
            Suggest Reply (AI)
          </button>

          {/* Display Suggested Reply */}
          {suggestedReply && (
            <div>
              <h3>AI Suggested Reply:</h3>
              <p>{suggestedReply}</p>
              <button
                type="button"
                onClick={() => setReplyText(suggestedReply)}
                style={{ marginTop: '0.5rem' }}
              >
                Use this reply
              </button>
            </div>
          )}

          {/* Reply Form */}
          <form onSubmit={handleReplySubmit} className="replyForm">
            <h3>Reply to this Review:</h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Enter your reply..."
              rows="4"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Replying...' : 'Submit Reply'}
            </button>
          </form>

          {/* Existing Replies */}
          {review.replies?.length > 0 && (
            <div className="replies">
              <h4>Previous Replies:</h4>
              <ul>
                {review.replies.map((r, index) => (
                  <li key={index}>{r.reviewReply}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
    
  );
}

export default FullImageView;
