import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <footer>
      <div className="container">
        {/* Left Section */}
        <div className="section">
          <h4>About</h4>
          <p>Brewing joy one cup at a time. <br></br><br></br>Thank you for visiting MOKA --,
          </p><p className='footerabout'>where every sip feels like home.</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="section">
          <h4>Quick Links</h4>
          <ul className="link-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
          </ul>
        </div>

        {/* Right Section - Contact & Socials */}
        <div className="section">
          <h4>Contact</h4>
          <p>Email: support@feedbackportal.com</p>
          <div className="socials">
            <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="icon"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="bottom">
        &copy; {new Date().getFullYear()} Feedback Portal. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
