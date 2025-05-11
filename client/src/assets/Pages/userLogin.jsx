import React, { useState } from 'react';
import { Menu3 } from '../Components/menu1';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Components/Footer';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:2000/user/login', {
        email,
        password,
      });

      alert(res.data.message);
      localStorage.setItem('token', res.data.token);
      navigate('/customerreview'); // Redirect after login (change to your target page)
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
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
                <th><label htmlFor="email">Email</label></th>
                <td><input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                /></td>
              </tr>
              <tr>
                <th><label htmlFor="password">Password</label></th>
                <td><input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                /></td>
              </tr>
             
              <tr>
                <th><Link to="/signup">No account? Create one!</Link></th>
                <td><Link to="/forgotpassword">Forgot password? No worries</Link></td>
              </tr>
            </tbody>
          </table>

          <input type="submit" value="Login" />
        </form>
      </div>
      <Footer/>
    </div>
    
   
  );
}

export default UserLogin;
