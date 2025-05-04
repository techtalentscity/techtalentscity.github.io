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
  
  // Google Form configuration
  const googleFormID = "1FAIpQLSdc7dgkqLO6xXSZPlvIBUK61_6I3kcXGwM4GLJbuQdneBpVyA";
  const googleFormURL = `https://docs.google.com/forms/d/e/${googleFormID}/formResponse`;
  const discordURL = "https://discord.gg/FwNQc7VJVk";

  // Entry IDs from the Google Form (verified from HTML)
  const entryIDs = {
    firstName: "entry.2120631500", // First Name field entry ID
    lastName: "entry.976572827",   // Last Name field entry ID
    email: "entry.1043611405"      // Email field entry ID (verify this matches your form)
  };

  // Create a custom hook to debounce function calls
  const useDebounce = (callback, delay) => {
    const [timeoutId, setTimeoutId] = useState(null);
    
    const debouncedFn = (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      const newTimeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
      
      setTimeoutId(newTimeoutId);
    };
    
    return debouncedFn;
  };

  // Check if user has already registered when component mounts
  useEffect(() => {
    const registrationStatus = localStorage.getItem('ttc_registration_completed');
    if (registrationStatus === 'true') {
      setHasRegistered(true);
    }
  }, []);
  
  // Validate email format
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  // Get registered emails from localStorage
  const getRegisteredEmails = () => {
    try {
      const emailsJson = localStorage.getItem('ttc_registered_emails');
      if (!emailsJson) return [];
      
      const emails = JSON.parse(emailsJson);
      return Array.isArray(emails) ? emails : [];
    } catch (error) {
      console.error('Error retrieving registered emails:', error);
      return [];
    }
  };
  
  // Store a registered email in localStorage
  const storeRegisteredEmail = (email) => {
    if (!email) return;
    
    try {
      const emailsLowerCase = email.toLowerCase();
      const existingEmails = getRegisteredEmails();
      
      if (!existingEmails.some(e => e.toLowerCase() === emailsLowerCase)) {
        existingEmails.push(emailsLowerCase);
        localStorage.setItem('ttc_registered_emails', JSON.stringify(existingEmails));
      }
    } catch (error) {
      console.error('Error storing registered email:', error);
    }
  };

  // Check if the email already exists
  const checkExistingEmailBase = async (emailToCheck) => {
    if (!emailToCheck || !validateEmail(emailToCheck)) {
      setCheckingEmail(false);
      return false;
    }
    
    setCheckingEmail(true);
    
    try {
      // First check localStorage for previously registered emails
      const localEmails = getRegisteredEmails();
      const emailLowerCase = emailToCheck.toLowerCase();
      
      if (localEmails.some(e => e.toLowerCase() === emailLowerCase)) {
        setEmailExists(true);
        setErrors(prev => ({ ...prev, email: 'This email has already been registered' }));
        setCheckingEmail(false);
        return true;
      }
      
      // If we get here, the email is available
      setEmailExists(false);
      
      // Clear any existing email error if it was about registration
      if (errors.email === 'This email has already been registered') {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
      
      setCheckingEmail(false);
      return false;
      
    } catch (error) {
      console.error('Error checking email:', error);
      setCheckingEmail(false);
      return false;
    }
  };
  
  // Create a debounced version of the email check function
  const checkExistingEmail = useDebounce(checkExistingEmailBase, 300);

  // Handle email input change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    if (!newEmail) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
      setEmailExists(false);
      return;
    }
    
    if (!validateEmail(newEmail)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      if (errors.email === 'Please enter a valid email') {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
      
      setCheckingEmail(true);
      checkExistingEmail(newEmail);
    }
  };
  
  // Handle email blur (when user leaves the email field)
  const handleEmailBlur = async () => {
    if (email && validateEmail(email)) {
      await checkExistingEmailBase(email);
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
    
    // Reset errors for a fresh validation
    setErrors({});
    
    // Form validation
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
    
    // Double-check if email already exists before submission
    setLoading(true);
    const emailAlreadyExists = await checkExistingEmailBase(email);
    
    if (emailAlreadyExists) {
      newErrors.email = 'This email has already been registered';
      message.error('This email has already been registered. Please use a different email.');
      isValid = false;
    }
    
    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    
    // Prepare form data for Google Forms submission
    const formData = new FormData();
    formData.append(entryIDs.firstName, firstName);
    formData.append(entryIDs.lastName, lastName);
    formData.append(entryIDs.email, email);
    
    // Additional hidden fields required by Google Forms
    formData.append("fvv", "1");
    formData.append("partialResponse", JSON.stringify([null,null,"-2735622603155026322"]));
    formData.append("pageHistory", "0");
    formData.append("fbzx", "-2735622603155026322");
    
    // Submit to Google Form
    try {
      // Using fetch with no-cors mode
      const response = await fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors', // Required for cross-origin requests to Google Forms
        body: formData
      });
      
      // Even with no-cors, we can't read the response but we can assume it worked
      console.log('Form submitted to Google Forms');
      
      // Store registration info in localStorage
      localStorage.setItem('ttc_registration_completed', 'true');
      localStorage.setItem('ttc_registered_email', email);
      
      // Add to local registry of emails
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
              
              <form onSubmit={handleSubmit} className="pt-8">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name *
                  </label>
                  <input 
                    type="text" 
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
                    id="email"
                    className={`shadow appearance-none border ${errors.email ? 'border-red-500' : emailExists === false && email && validateEmail(email) ? 'border-green-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
                  acknowledge you've read our <span className='text-primary font-medium'>Privacy Policy</span>.
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
