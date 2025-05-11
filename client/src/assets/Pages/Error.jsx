import React from 'react';
import { Link } from 'react-router-dom';
import cookieIcon from '../Images/cookie.png'; 

function Error() {
  return (
    <div className="error-container">
      <h1 style={{
        marginLeft: '-800px',
        marginTop: '00px',
        fontFamily: 'Caveat, cursive',
        fontSize: '400px'
      }}>4</h1>

      <img
        src={cookieIcon}
        alt="CookieIcon"
        className="cookieIcon"
        
        style={{ marginTop: '-700px' }}
      />

      <h1 style={{
        marginRight: '-620px',
        fontFamily: 'Caveat, cursive',
        marginTop: '-500px',
        fontSize: '400px'
      }}>4</h1>
<div><h2 className="error-text">Page Not Found</h2>
      <p className="error-description">
        Oops! The page you’re looking for is missing,<br /> but here's a cookie for you
      </p>
      <Link to="/" className="error-button">
        Take Me Home
      </Link>
      <p className="error-footer">Serving joy, not 404s ☕</p></div>
      
    </div>
  );
}

export default Error;
