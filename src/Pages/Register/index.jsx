import { Link } from 'react-router-dom';
import IMAGE from '../../assets/images/signupbg.png';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, message } from 'antd';
import { useState, useEffect } from 'react';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [hasRegistered, setHasRegistered] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  
  // Your updated Google Form ID from the new URL
  const googleFormID = "1FAIpQLSdc7dgkqLO6xXSZPlvIBUK61_6I3kcXGwM4GLJbuQdneBpVyA";
  
  // Form submission URL
  const googleFormURL = `https://docs.google.com/forms/d/e/${googleFormID}/formResponse`;
  
  // Discord redirect URL
  const discordURL = "https://discord.gg/FwNQc7VJVk";
  
  // ==========================================
  // IMPROVED EMAIL VALIDATION FUNCTIONS
  // ==========================================
  
  // Fetch registered emails from localStorage
  const getRegisteredEmails = () => {
    try {
      return JSON.parse(localStorage.getItem('ttc_registered_emails') || '[]');
    } catch (error) {
      console.error('Error getting registered emails:', error);
      return [];
    }
  };
  
  // Store a new registered email in localStorage
  const storeRegisteredEmail = (email) => {
    try {
      const existingEmails = getRegisteredEmails();
      if (!existingEmails.includes(email.toLowerCase())) {
        existingEmails.push(email.toLowerCase());
        localStorage.setItem('ttc_registered_emails', JSON.stringify(existingEmails));
      }
    } catch (error) {
      console.error('Error storing email:', error);
    }
  };
  
  // Check if email exists in the registration system
  const checkExistingEmail = async (email) => {
    if (!email) return false;
    
    setCheckingEmail(true);
    
    return new Promise((resolve) => {
      // Simulate a network delay for better UX (so user sees "checking" message)
      setTimeout(() => {
        try {
          // Check localStorage for registered emails (client-side check)
          const existingEmails = getRegisteredEmails();
          const exists = existingEmails.includes(email.toLowerCase());
          
          // Update state based on existence check
          if (exists) {
            setErrors(prev => ({ ...prev, email: 'This email has already been registered' }));
            setEmailExists(true);
          } else {
            // Clear email error if it exists
            if (errors.email === 'This email has already been registered') {
              setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.email;
                return newErrors;
              });
            }
            setEmailExists(false);
          }
          
          setCheckingEmail(false);
          resolve(exists);
        } catch (error) {
          console.error('Error checking email:', error);
          setCheckingEmail(false);
          resolve(false);
        }
      }, 500); // 500ms delay to show checking state
    });
  };
  
  // ==========================================
  // VALIDATION FUNCTIONS
  // ==========================================
  
  // Validate email format
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  // ==========================================
  // EVENT HANDLERS
  // ==========================================
  
  // Check if user has already registered when component mounts
  useEffect(() => {
    // Check if the user has already registered on this device
    const registrationStatus = localStorage.getItem('ttc_registration_completed');
    if (registrationStatus === 'true') {
      setHasRegistered(true);
    }
  }, []);
  
  // Handle email input changes
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear existing email error if field is empty
    if (!newEmail) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
      setEmailExists(false);
      return;
    }
    
    // Validate email format
    if (!validateEmail(newEmail)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      // Clear format error if it exists
      if (errors.email === 'Please enter a valid email') {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
    }
  };
  
  // Check email existence when user leaves the email field
  const handleEmailBlur = async () => {
    if (email && validateEmail(email)) {
      await checkExistingEmail(email);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if already registered via localStorage
    if (localStorage.getItem('ttc_registration_completed') === 'true') {
      message.info('You have already registered. Redirecting to Discord...');
      setTimeout(() => {
        window.location.href = discordURL;
      }, 1500);
      return;
    }
    
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
    
    // Final check if email already exists in localStorage
    const emailAlreadyExists = await checkExistingEmail(email);
    if (emailAlreadyExists) {
      newErrors.email = 'This email has already been registered';
      message.error('This email has already been registered. Please use a different email.');
      isValid = false;
    }
    
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    
    // Set loading
    setLoading(true);
    
    // Create form data to submit
    const formData = new FormData();
    formData.append('entry.2120631500', firstName);
    formData.append('entry.976572827', lastName);
    formData.append('entry.1043611405', email);
    
    // Submit the form using fetch API
    try {
      const response = await fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors', // Important for cross-origin requests to Google Forms
        body: formData
      });
      
      // Store registration status in localStorage
      localStorage.setItem('ttc_registration_completed', 'true');
      localStorage.setItem('ttc_registered_email', email);
      
      // Add to global list of registered emails
      storeRegisteredEmail(email);
      
      // Show success message
      message.success('Registration successful! Redirecting to Discord...');
      
      // Redirect to Discord
      setTimeout(() => {
        window.location.href = discordURL;
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Something went wrong. Please try again.');
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
                onClick={() => window.location.href = discordURL}
                className="p-2 !h-auto font-bold"
              >
                Join our Discord Community
              </Button>
            </div>
          ) : (
            <>
              <p className='text-[#A2A2A2]'>Kindly fill in your details below to create an account</p>
              
              {/* Form submission handled via handleSubmit */}
              <form 
                id="registration-form"
                onSubmit={handleSubmit}
                className="pt-8"
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name *
                  </label>
                  <input 
                    type="text" 
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
                
                <div className="mb-6 relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    name="entry.1043611405" 
                    id="email"
                    className={`shadow appearance-none border ${errors.email ? 'border-red-500' : emailExists === false && email ? 'border-green-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    placeholder="johndoe@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    required
                  />
                  {checkingEmail && (
                    <p className="text-blue-500 text-xs italic mt-1">Checking email...</p>
                  )}
                  {errors.email ? (
                    <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
                  ) : emailExists === false && email && validateEmail(email) ? (
                    <p className="text-green-500 text-xs italic mt-1">Email is available!</p>
                  ) : null}
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
                  disabled={checkingEmail || emailExists || Object.keys(errors).length > 0}
                >
                  Register with us
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p>
                  Already have an account? <a href="https://docs.google.com/forms/d/e/1FAIpQLSdc7dgkqLO6xXSZPlvIBUK61_6I3kcXGwM4GLJbuQdneBpVyA/viewform" target="_blank" rel="noopener noreferrer" className='text-primary font-bold'>Log In</a>
                </p>
              </div>
            </>
          )}
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
