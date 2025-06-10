import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import supabase from '../helper/supabaseClient';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ''}); // Clear error on change
  };

  const validateEmail = (email) => {
    // Simple email regex validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

  

    // If no errors, proceed with form submission logic
    try{
      const {data, error: signUpError} = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName, // You can make these dynamic
            last_name: formData.lastName
          }
        }
      })

      if(signUpError){
        throw signUpError
      }

      setSuccess(true)
      setLoading(false)
    }
    catch(error){
      window.alert('Failed to register a new user')
      console.log(error);
    }
  };

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate('/dashboard')
      }
    }

    checkSession()
  }, [navigate])

  return (
    <main>
      <div className="register-container">
        <h2 className="register-title">Create your account</h2>
        <p className="register-subtitle">Please fill in the form to register</p>
        {success && (
        <div style={{ color: 'green' }}>
          Success! Please check your email for confirmation.
        </div>
      )}
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="fullName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="name"
            required
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
          />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          <label htmlFor="fullName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="name"
            required
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
          />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="********"
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Loading...': 'Register'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
