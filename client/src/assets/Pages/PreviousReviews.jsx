import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PreviousReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:2000/user/previousreviews', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Previous Reviews</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews submitted yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Image</th>
              <th>Admin Replies</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.reviewTitle || 'No Title'}</td>
                <td>{review.reviewMessage || 'No message'}</td>
                <td>{review.rating}</td>
                <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                <td>
                  {review.image && (
                    <img
                      src={`http://localhost:2000/${review.image.replace(/^\/+/, '')}`}
                      alt="Review"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  )}
                </td>
                <td>
                  {review.replies?.length > 0 ? (
                    <ul>
                      {review.replies.map((r, i) => (
                        <li key={i}>{r.reviewReply}</li>
                      ))}
                    </ul>
                  ) : (
                    'No replies'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PreviousReviews;
