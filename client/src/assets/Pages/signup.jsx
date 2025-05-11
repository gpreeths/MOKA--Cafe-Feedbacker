import React, { useState } from 'react';
import { Menu3 } from '../Components/menu1';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer'

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:2000/user/signup', userData);

      if (response.status === 201) {
        setSuccessMessage('Signup successful!');
        setName('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          navigate('/userlogin');
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Menu3 />
      <div className="loginContainer">
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th><label htmlFor="name">Name</label></th>
                <td><input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                /></td>
              </tr>
              <tr>
                <th><label htmlFor="email">Email</label></th>
                <td><input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                /></td>
              </tr>
              <tr>
                <th><label htmlFor="password">Password</label></th>
                <td><input 
                  type="password" 
                  id="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                /></td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value={loading ? 'Submitting...' : 'Sign Up'} disabled={loading} />
        </form>

        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
      <Footer/>
    </div>
  );
}

export default Signup;
