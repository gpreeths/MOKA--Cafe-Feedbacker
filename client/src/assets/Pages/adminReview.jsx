import React, { useEffect, useState } from 'react';
import { Menu5 } from '../Components/menu1';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from 'react-rating';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AdminReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ sortBy: 'rating', order: 'asc' });
  const [suggestedReplies, setSuggestedReplies] = useState({}); // Store suggested replies by review ID

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:2000/admin/view', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedReviews = response.data || [];
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Failed to fetch reviews:', error.response?.data || error.message);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const toggleSort = (field) => {
    setSortConfig((prevConfig) => {
      let newOrder = 'asc';
      if (prevConfig.sortBy === field && prevConfig.order === 'asc') {
        newOrder = 'desc';
      }
      return { sortBy: field, order: newOrder };
    });
  };

  useEffect(() => {
    const fetchSortedReviews = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const { sortBy, order } = sortConfig;
        const response = await axios.get(`http://localhost:2000/admin/sort?sortBy=${sortBy}&order=${order}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedReviews = response.data?.reviews || response.data || [];
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Failed to fetch sorted reviews:', error.response?.data || error.message);
      }
    };

    fetchSortedReviews();
  }, [sortConfig]);

 
  const handleSuggestReply = async (reviewId, reviewMessage) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(
        'http://localhost:2000/admin/suggestreply',
        { reviewMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuggestedReplies((prev) => ({
        ...prev,
        [reviewId]: response.data.suggestedReply,
      }));
    } catch (error) {
      console.error('Failed to fetch AI reply suggestion:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Menu5 />
      <div className="adminContainer">
        <div className="sideBar">
          <ul>
            <br />
            <li><Link to="/adminreview/rating">Rating</Link></li>
            <li><Link to="/adminreview/allreviews">All reviews</Link></li>
            <li><Link to="/adminreview/customers">Customers</Link></li>
          </ul>
        </div>

        <div className="adminReview">
          <h1>Reviews</h1>

          <div className="totavg_reviewTotal">
            <div className="reviewTotal">
              <h3>Total reviews: {reviews.length}</h3>
            </div>
            </div>
            <div className='totavg_reviewAvg'>
            <div className="reviewAvg">
              <h3>Avg rating: {
                reviews.length > 0
                  ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                  : 0
              }</h3>
            </div>
          </div>

          <div className="customerRatingBox">
            {loading ? (
              <p>Loading reviews...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>
                      Rating 
                      <button onClick={() => toggleSort('rating')}>
                        {sortConfig.sortBy === 'rating' && sortConfig.order === 'asc' ? '↑' : '↓'}
                      </button>
                    </th>
                    <th>
                      Date 
                      <button onClick={() => toggleSort('createdAt')}>
                        {sortConfig.sortBy === 'createdAt' && sortConfig.order === 'asc' ? '↑' : '↓'}
                      </button>
                    </th>
                    <th>Message</th>
                    <th>Image</th>
                    <th>Replies</th>
                    <th>AI Reply Suggestion</th> 
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(reviews) && reviews.length > 0 ? (
                    reviews.map((review) => (
                      <tr key={review._id}>
                        <td>{review.userId?.name || 'Unknown'}</td>
                        <td>
                        <Rating
  initialRating={review.rating}
  readonly
  emptySymbol={<i className="far fa-star" style={{ color: '#ccc', fontSize: '20px' }}></i>}
  fullSymbol={<i className="fas fa-star" style={{ color: '#FFD700', fontSize: '20px' }}></i>}
/>

</td>
                        <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                        <td>{review.reviewMessage || 'No message'}</td>
                        <td>
                          {review.image && (
                            <Link to={`/full-image/${review._id}`} target="_blank">
                              <img
                                src={`http://localhost:2000/uploads/${review.image}`}
                                alt="Review"
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  objectFit: 'cover',
                                  marginTop: '5px',
                                }}
                              />
                            </Link>
                          )}
                        </td>
                        <td>
                          {review.replies && review.replies.length > 0 ? (
                            review.replies.map((reply, index) => (
                              <div key={index} style={{ marginBottom: '10px' }}>
                                <strong>Admin Reply:</strong>
                                <p>{reply.reviewReply}</p>
                              </div>
                            ))
                          ) : (
                            <p>No replies yet</p>
                          )}
                        </td>
                        <td>
                          <button onClick={() => handleSuggestReply(review._id, review.reviewMessage)}>
                            Get AI Suggestion
                          </button>
                          {suggestedReplies[review._id] && (
                            <div>
                              <strong>Suggested Reply:</strong>
                              <p>{suggestedReplies[review._id]}</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No reviews found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminReview;
