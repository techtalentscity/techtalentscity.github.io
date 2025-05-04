import { Link } from 'react-router-dom';
import IMAGE from '../../assets/images/signupbg.png';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, message } from 'antd';
import { useState } from 'react';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  // Your updated Google Form ID from the new URL
  const googleFormID = "1FAIpQLSdc7dgkqLO6xXSZPlvIBUK61_6I3kcXGwM4GLJbuQdneBpVyA";
  
  // Form submission URL
  const googleFormURL = `https://docs.google.com/forms/d/e/${googleFormID}/formResponse`;
  
  // Discord redirect URL
  const discordURL = "https://discord.gg/FwNQc7VJVk";

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Validate
    let isValid = true;
    const newErrors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    
    // Set loading
    setLoading(true);
    
    // Submit the form
    document.getElementById('registration-form').submit();
    
    // Show success message
    message.success('Registration successful! Redirecting to Discord...');
    
    // Redirect to Discord after a short delay
    setTimeout(() => {
      window.location.href = discordURL;
    }, 2000);
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
          
          {/* Direct form submission to Google Forms */}
          <form 
            id="registration-form"
            method="POST" 
            action={googleFormURL}
            onSubmit={handleSubmit}
            className="pt-8"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name *
              </label>
              <input 
                type="text" 
                // Actual entry ID from the Google Form
                name="entry.2120631500" 
                id="firstName"
                className={`shadow appearance-none border ${errors.firstName ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name *
              </label>
              <input 
                type="text" 
                // Actual entry ID from the Google Form
                name="entry.976572827" 
                id="lastName"
                className={`shadow appearance-none border ${errors.lastName ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address *
              </label>
              <input 
                type="email" 
                // Actual entry ID from the Google Form
                name="entry.1043611405" 
                id="email"
                className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="johndoe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            
            <p className='pb-6 text-sm'>
              By continuing, you agree to the <span className='text-primary font-medium'>Terms of Service</span> and 
              acknowledge you&apos;ve read our <span className='text-primary font-medium'>Privacy Policy</span>.
            </p>
            
            <Button 
              type='primary' 
              htmlType="submit"
              block 
              className='p-2 !h-auto font-bold'
              loading={loading}
            >
              Register with us
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p>
              Already have an account? <a href="https://docs.google.com/forms/d/e/1FAIpQLSdc7dgkqLO6xXSZPlvIBUK61_6I3kcXGwM4GLJbuQdneBpVyA/viewform" target="_blank" rel="noopener noreferrer" className='text-primary font-bold'>Log In</a>
            </p>
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
