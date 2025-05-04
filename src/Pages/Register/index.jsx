import { Link, useNavigate } from 'react-router-dom';
import IMAGE from '../../assets/images/signupbg.png';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Form, Input, message } from 'antd';
import { useState, useEffect } from 'react';

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  // Google Form submission URL
  const googleFormURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSch0F2yDodefxoGh5QyvrXzl2s7Z7Y0U04Zx8hUbar0hh-RlA/formResponse";
  
  // Discord redirect URL
  const discordURL = "https://discord.gg/FwNQc7VJVk";

  // Function to check if email exists
  const checkEmailExists = async (email) => {
    if (!email || !email.includes('@')) return false;
    
    try {
      setEmailCheckLoading(true);
      
      // Simulate API call to check if email exists in Google Sheet
      // In a real implementation, this would be a fetch to your backend API
      
      // For testing purposes, let's check against a hardcoded list of emails
      // Replace this with actual API implementation
      const existingEmails = ['test@example.com', 'john@example.com', 'jane@example.com'];
      const exists = existingEmails.includes(email.toLowerCase());
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEmailExists(exists);
      return exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    } finally {
      setEmailCheckLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Check one more time if email exists
      const exists = await checkEmailExists(values.email);
      
      if (exists) {
        message.error('This email is already registered');
        return;
      }
      
      setLoading(true);
      
      // Create form data for submission
      const formData = new FormData();
      
      // Add entry fields with the correct Google Form field IDs
      formData.append('entry.2120631500', values.firstName); // First Name field
      formData.append('entry.976572827', values.lastName); // Last Name field
      formData.append('entry.721402290', values.email); // Email Address field
      
      // Submit the form data
      await fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors', // Important for cross-origin requests to Google Forms
        body: formData
      });
      
      // Show success message
      message.success('Registration successful! Redirecting to Discord...');
      
      // Clear form
      form.resetFields();
      
      // Redirect to Discord after a short delay
      setTimeout(() => {
        window.location.href = discordURL;
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Custom validator for email that also checks if email exists
  const validateEmail = async (_, value) => {
    if (!value) {
      return Promise.reject('Email is required');
    }

    // Check email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) {
      return Promise.reject('Invalid email format');
    }

    // Check if email already exists
    const exists = await checkEmailExists(value);
    if (exists) {
      return Promise.reject('This email is already registered');
    }

    return Promise.resolve();
  };

  return (
    <div className="w-full flex items-center min-h-screen bg-white">
      <div className="w-full lg:w-[50%] flex justify-center items-center overflow-y-auto scrollbar-hide md:min-h-screen pt-12 md:pt-0">
        <Container className={'md:!px-16 lg:!px-0 md:min-h-screen pt-6 md:pt-12 pb-12'}>
          <Link to={'/'}>
            <img src={logo} alt="logo" className="w-[250px] object-cover object-center" />
          </Link>
          <p className='font-bold text-4xl py-5'>Welcome to TechTalents City👋</p>
          <p className='text-[#A2A2A2]'>Kindly fill in your details below to create an account</p>
          
          <Form 
            layout='vertical' 
            className='pt-8'
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item 
              label="First Name" 
              name="firstName" 
              rules={[
                { required: true, message: 'First Name is required' }
              ]}
            >
              <Input placeholder="John" className='p-2' />
            </Form.Item>
            
            <Form.Item 
              label="Last Name" 
              name="lastName" 
              rules={[
                { required: true, message: 'Last Name is required' }
              ]}
            >
              <Input placeholder="Doe" className='p-2' />
            </Form.Item>
            
            <Form.Item 
              label="Email Address" 
              name="email" 
              rules={[
                { validator: validateEmail }
              ]}
              validateStatus={emailExists ? 'error' : undefined}
              help={emailExists ? 'This email is already registered' : undefined}
            >
              <Input 
                placeholder="johndoe@email.com" 
                className='p-2' 
                onChange={() => setEmailExists(false)}
              />
            </Form.Item>
            
            <p className='pb-6 text-sm'>
              By continuing, you agree to the <span className='text-primary font-medium'>Terms of Service</span> and 
              acknowledge you&apos;ve read our <span className='text-primary font-medium'>Privacy Policy</span>.
            </p>
            
            <Button 
              type='primary' 
              block 
              className='p-2 !h-auto font-bold' 
              htmlType="submit"
              loading={loading}
              disabled={emailCheckLoading || emailExists}
            >
              Register with us
            </Button>
          </Form>
          
          <div className="mt-6 text-center">
            <p>Already have an account? <a href="https://docs.google.com/forms/d/e/1FAIpQLSch0F2yDodefxoGh5QyvrXzl2s7Z7Y0U04Zx8hUbar0hh-RlA/viewform" target="_blank" rel="noopener noreferrer" className='text-primary font-bold'>Log In</a></p>
          </div>
        </Container>
      </div>
      
      <div className="hidden lg:w-[50%] h-full lg:flex justify-center items-center rounded-l-[60px] relative">
        <img src={IMAGE} alt="login" className='w-full h-full object-cover rounded-l-[60px]' />
        <div className="absolute top-40 left-20 2xl:left-40 inset-0 flex flex-col justify-center items-center bg-white bg-opacity-20 w-[400px] xl:w-[500px] h-[350px] text-white p-8">
          <h2 className="text-3xl xl:text-5xl font-bold mb-4">Connecting Talents to Opportunities</h2>
          <p className="text-lg text-[#F6F6F8]">Connect talent to opportunities and speed up your TechTalent badge earnings by creating and collaborating on projects.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
