import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.role) newErrors.role = 'Please select a role';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:5000/api/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response?.data);
      setErrors({ submit: error.response?.data.error || 'Signup failed' });
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
        <h2>Sign up</h2>
        {errors.submit && <div className="error">{errors.submit}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group" style={{ flex: 1 }}>
              <label>First name</label>
              <input 
                type="text" 
                name="firstName" 
                placeholder="Enter First Name" 
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="error">{errors.firstName}</div>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                placeholder="Enter Last Name" 
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="error">{errors.lastName}</div>}
            </div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>Create Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Create Password" 
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label>Re-enter Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>
          <div className="form-group">
            <label>Sign up as</label>
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
            {errors.role && <div className="error">{errors.role}</div>}
          </div>
          <button type="submit" className="signup-btn">Sign up</button>
          <div className="login-link">
            Already have an account? <a href="/login">LOG IN</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;