import { Link } from 'react-router-dom';
import IMAGE from '../../assets/images/signupbg.png';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, message } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  
  // React Hook Form setup
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    getValues,
    setError,
    clearErrors
  } = useForm();

  // Google Form submission URL
  const googleFormURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSch0F2yDodefxoGh5QyvrXzl2s7Z7Y0U04Zx8hUbar0hh-RlA/formResponse";
  
  // Discord redirect URL
  const discordURL = "https://discord.gg/FwNQc7VJVk";

  // Function to check if email exists in Google Sheet
  const checkEmailExists = async (email) => {
    try {
      // Replace with your actual API endpoint that checks if email exists
      // This could be a Google Apps Script web app deployed as an API
      const response = await fetch(`https://your-api-endpoint.com/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      return data.exists; // Should return true if email exists, false otherwise
    } catch (error) {
      console.error("Error checking email:", error);
      return false; // Default to false if there's an error checking
    }
  };

  // Handle email input change to validate in real-time
  const handleEmailChange = async (e) => {
    const email = e.target.value;
    
    // Clear any previous email errors
    clearErrors("email");
    setEmailError("");
    
    // Basic validation - if field is empty or invalid format, let React Hook Form handle it
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return;
    }
    
    // Only check for existence if email has valid format
    const exists = await checkEmailExists(email);
    if (exists) {
      setEmailError("This email is already registered");
      setError("email", { 
        type: "manual", 
        message: "This email is already registered" 
      });
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // One final check before submitting
      const emailExists = await checkEmailExists(data.email);
      
      if (emailExists) {
        setEmailError("This email is already registered");
        setError("email", { 
          type: "manual", 
          message: "This email is already registered" 
        });
        return;
      }
      
      setLoading(true);
      
      // Create form data for submission
      const formData = new FormData();
      
      // Add entry fields with the correct Google Form field IDs
      formData.append('entry.2120631500', data.firstName); // First Name field
      formData.append('entry.976572827', data.lastName); // Last Name field
      formData.append('entry.721402290', data.email); // Email Address field
      
      // Submit the form data
      await fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors', // Important for cross-origin requests to Google Forms
        body: formData
      });
      
      // Show success message
      message.success('Registration successful! Redirecting to Discord...');
      
      // Clear form
      reset();
      
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

  return (
    <div className="w-full flex items-center min-h-screen bg-white">
      <div className="w-full lg:w-[50%] flex justify-center items-center overflow-y-auto scrollbar-hide md:min-h-screen pt-12 md:pt-0">
        <Container className={'md:!px-16 lg:!px-0 md:min-h-screen pt-6 md:pt-12 pb-12'}>
          <Link to={'/'}>
            <img src={logo} alt="logo" className="w-[250px] object-cover object-center" />
          </Link>
          <p className='font-bold text-4xl py-5'>Welcome to TechTalents City👋</p>
          <p className='text-[#A2A2A2]'>Kindly fill in your details below to create an account</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className='pt-8'>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input 
                className={`shadow appearance-none border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="text" 
                placeholder="John"
                {...register("firstName", { 
                  required: "First name is required"
                })}
              />
              {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input 
                className={`shadow appearance-none border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="text" 
                placeholder="Doe"
                {...register("lastName", { 
                  required: "Last name is required"
                })}
              />
              {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="email" 
                placeholder="johndoe@email.com"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  },
                  onChange: (e) => handleEmailChange(e)
                })}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
              {emailError && !errors.email && <p className="text-red-500 text-xs italic">{emailError}</p>}
            </div>
            
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
              disabled={!!emailError}
            >
              Register with us
            </Button>
          </form>
          
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
