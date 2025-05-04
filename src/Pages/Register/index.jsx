import { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-black.png';

const Register = () => {
  // Your specific Apps Script URL
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPlmv0E8XNRmocu5MUeOtbfmJH0K4EPUFvl6Wlsp3JtJ7dk4PzM0b1fCYESwKMngsX/exec';
  const DISCORD_URL = "https://discord.gg/FwNQc7VJVk";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [hasRegistered, setHasRegistered] = useState(false);

  // Check existing registration
  useEffect(() => {
    const registered = localStorage.getItem('ttc_registration_completed') === 'true';
    setHasRegistered(registered);
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    try {
      // Important: Add no-cors mode and specific headers
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // With no-cors mode, we can't read the response directly
      // So we'll assume success if no network error
      return true;
    } catch (error) {
      console.error('Submission error:', error);
      throw new Error('Failed to submit form. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (hasRegistered) {
      window.location.href = DISCORD_URL;
      return;
    }
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await submitForm();
      
      // Store registration locally
      localStorage.setItem('ttc_registration_completed', 'true');
      localStorage.setItem('ttc_registered_email', formData.email);
      
      message.success('Registration successful! Redirecting...');
      setTimeout(() => {
        window.location.href = DISCORD_URL;
      }, 1500);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center min-h-screen bg-white">
      <div className="w-full lg:w-[50%] flex justify-center items-center overflow-y-auto md:min-h-screen pt-12 md:pt-0">
        <div className="md:px-16 lg:px-0 md:min-h-screen pt-6 md:pt-12 pb-12">
          <Link to="/">
            <img src={logo} alt="logo" className="w-[250px] object-cover object-center" />
          </Link>
          <p className="font-bold text-4xl py-5">Welcome to TechTalents City👋</p>
          
          {hasRegistered ? (
            <div className="text-center py-8">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-5 rounded mb-6">
                <p className="font-bold text-xl mb-2">You have already registered!</p>
                <p>Your registration has been recorded.</p>
                <p className="mt-2">
                  Email: <span className="font-medium">{localStorage.getItem('ttc_registered_email')}</span>
                </p>
              </div>
              <Button 
                type="primary" 
                onClick={() => window.location.href = DISCORD_URL}
                className="p-2 !h-auto font-bold"
              >
                Join our Discord Community
              </Button>
            </div>
          ) : (
            <>
              <p className="text-[#A2A2A2]">Kindly fill in your details below to create an account</p>
              
              <form onSubmit={handleSubmit} className="pt-8">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    First Name *
                  </label>
                  <input 
                    type="text"
                    name="firstName"
                    className={`shadow appearance-none border ${errors.firstName ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name *
                  </label>
                  <input 
                    type="text"
                    name="lastName"
                    className={`shadow appearance-none border ${errors.lastName ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address *
                  </label>
                  <input 
                    type="email"
                    name="email"
                    className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    placeholder="johndoe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
                </div>
                
                <p className="pb-6 text-sm">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
                
                <Button 
                  type="primary" 
                  htmlType="submit"
                  block 
                  className="p-2 !h-auto font-bold"
                  loading={loading}
                >
                  Register with us
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
