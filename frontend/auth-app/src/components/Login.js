import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.role) {
      setErrors({ submit: 'Please fill all fields' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      console.log('Login successful:', response.data);
      // Store user data and redirect (in a real app, you'd use context or redux)
      navigate('/home'); // Change this to your protected route
    } catch (error) {
      console.error('Login error:', error.response?.data);
      setErrors({ submit: error.response?.data.error || 'Login failed' });
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="overlay-text">
          <span>Crafted culture, curated for you.</span>
        </div>
      </div>
      <div className="right">
        <h2>Log in</h2>
        {errors.submit && <div className="error">{errors.submit}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Enter Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter Password" 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="role-selection">
            <button 
              type="button" 
              className={formData.role === 'vendor' ? 'hovered' : ''}
              onClick={() => handleRoleSelect('vendor')}
            >
              Vendor
            </button>
            <button 
              type="button" 
              className={formData.role === 'customer' ? 'hovered' : ''}
              onClick={() => handleRoleSelect('customer')}
            >
              Customer
            </button>
          </div>
          <button type="submit" className="login-btn">Log in</button>
          <div className="switch">
            Don't have an account? <a href="/signup">SIGN UP</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;