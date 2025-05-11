import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/Pages/home';
import Login from './assets/Pages/login';
import Signup from './assets/Pages/signup';
import Userlogin from './assets/Pages/userLogin';
import AdminLogin from './assets/Pages/adminLogin';
import AdminReview from './assets/Pages/adminReview';
import CustomerReview from './assets/Pages/CustomerReview';
import PreviousReviews from './assets/Pages/PreviousReviews.jsx';
import Error from './assets/Pages/Error.jsx';
import FullImageView from './assets/Pages/FullImageView.jsx';// Import the new FullImageView component
import './style.css';


function App() {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userlogin" element={<Userlogin />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/customerreview" element={<CustomerReview />} />
      <Route path="/adminReview" element={<AdminReview />} />
      <Route path="/previousreviews" element={<PreviousReviews />} />
      <Route path="/full-image/:id" element={<FullImageView />} /> {/* Route to view full image */}
    </Routes>
  );
}

export default App;
