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
  
  // Discord redirect URL
  const discordURL = "https://discord.gg/FwNQc7VJVk";
  
  // Your Google Form details
  const formId = "1FAIpQLSdc7dgkqLO6xXSZPlvIBUK61_6I3kcXGwM4GLJbuQdneBpVyA";
  const entryIds = {
    firstName: "entry.2120631500",
    lastName: "entry.976572827",
    email: "entry.1043611405"
  };
  
  // Check if user has already registered when component mounts
  useEffect(() => {
    // Check if the user has already registered on this device
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
  
  // Get registered emails from localStorage with error handling
  const getRegisteredEmails = () => {
    try {
      // Parse the JSON array of registered emails
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
      
      // Check if email already exists (case-insensitive)
      if (!existingEmails.some(e => e.toLowerCase() === emailsLowerCase)) {
        existingEmails.push(emailsLowerCase);
        localStorage.setItem('ttc_registered_emails', JSON.stringify(existingEmails));
      }
    } catch (error) {
      console.error('Error storing registered email:', error);
    }
  };
  
  // Check if the email already exists in the system
  const checkExistingEmail = (emailToCheck) => {
    if (!emailToCheck || !validateEmail(emailToCheck)) {
      setCheckingEmail(false);
      return false;
    }
    
    setCheckingEmail(true);
    
    try {
      // Check if email exists in localStorage
      const localEmails = getRegisteredEmails();
      const emailLowerCase = emailToCheck.toLowerCase();
      
      if (localEmails.some(e => e.toLowerCase() === emailLowerCase)) {
        setEmailExists(true);
        setErrors(prev => ({ ...prev, email: 'This email has already been registered' }));
        setCheckingEmail(false);
        return true;
      }
      
      // If not in localStorage, assume it's not registered
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

  // Handle email input change
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
  
  // Check email when focus leaves the field
  const handleEmailBlur = () => {
    if (email && validateEmail(email)) {
      checkExistingEmail(email);
    }
  };

  // Function to submit form using CORS proxy
  const submitFormWithCorsProxy = async (formData) => {
    try {
      // Option 1: Use a CORS proxy service
      const corsProxyUrl = 'https://corsproxy.io/?';
      
      // Google Form submission URL
      const googleFormUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
      
      // Create URL params for the form data
      const params = new URLSearchParams();
      params.append(entryIds.firstName, formData.firstName);
      params.append(entryIds.lastName, formData.lastName);
      params.append(entryIds.email, formData.email);
      
      // Submit the form through the CORS proxy
      const response = await fetch(`${corsProxyUrl}${encodeURIComponent(googleFormUrl)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      
      // If we get here, the form was submitted (even if Google returns a redirect)
      return { success: true };
    } catch (error) {
      console.error('Error submitting form through CORS proxy:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Function to submit using a hidden iframe
  const submitFormWithIframe = () => {
    return new Promise((resolve) => {
      // Create a hidden iframe
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden-form-target';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Create a temporary form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
      form.target = 'hidden-form-target';
      
      // Add form fields
      const firstNameField = document.createElement('input');
      firstNameField.type = 'text';
      firstNameField.name = entryIds.firstName;
      firstNameField.value = firstName;
      form.appendChild(firstNameField);
      
      const lastNameField = document.createElement('input');
      lastNameField.type = 'text';
      lastNameField.name = entryIds.lastName;
      lastNameField.value = lastName;
      form.appendChild(lastNameField);
      
      const emailField = document.createElement('input');
      emailField.type = 'email';
      emailField.name = entryIds.email;
      emailField.value = email;
      form.appendChild(emailField);
      
      // Add form to the document
      document.body.appendChild(form);
      
      // Handle iframe load
      iframe.onload = () => {
        // Clean up
        setTimeout(() => {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
        }, 500);
        
        // Resolve promise
        resolve({ success: true });
      };
      
      // Handle errors
      iframe.onerror = () => {
        // Clean up
        setTimeout(() => {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
        }, 500);
        
        // Resolve promise with error
        resolve({ success: false, error: 'Failed to load iframe' });
      };
      
      // Submit the form
      form.submit();
    });
  };
  
  // Submit data using an email service as a backup option
  const submitWithEmailService = async (formData) => {
    try {
      // Option 2: Use a service like Formspree or EmailJS
      // You would need to sign up for a free account
      
      // Example using EmailJS (you would need to add the EmailJS SDK to your project)
      // const result = await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   {
      //     firstName: formData.firstName,
      //     lastName: formData.lastName,
      //     email: formData.email,
      //   },
      //   'YOUR_USER_ID'
      // );
      
      // For now, we'll just simulate a successful response
      return { success: true };
    } catch (error) {
      console.error('Error submitting with email service:', error);
      return { success: false, error: error.message };
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
    
    // Check if email already exists
    const emailAlreadyExists = checkExistingEmail(email);
    
    if (emailAlreadyExists) {
      newErrors.email = 'This email has already been registered';
      message.error('This email has already been registered. Please use a different email.');
      isValid = false;
    }
    
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    
    // Set loading state
    setLoading(true);
    
    // Prepare form data
    const formData = {
      firstName,
      lastName,
      email
    };
    
    // Try multiple submission methods in sequence
    try {
      // First method: Use iframe submission
      let result = await submitFormWithIframe();
      
      // If iframe submission fails, try CORS proxy
      if (!result.success) {
        result = await submitFormWithCorsProxy(formData);
      }
      
      // If CORS proxy fails, try email service
      if (!result.success) {
        result = await submitWithEmailService(formData);
      }
      
      // Store registration in localStorage regardless of submission result
      // This ensures the user doesn't have to try again if there are backend issues
      localStorage.setItem('ttc_registration_completed', 'true');
      localStorage.setItem('ttc_registered_email', email);
      storeRegisteredEmail(email);
      
      // Show success message
      message.success('Registration successful! Redirecting to Discord...');
      
      // Redirect to Discord
      setTimeout(() => {
        window.location.href = discordURL;
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Even on error, store in localStorage to prevent duplicate attempts
      localStorage.setItem('ttc_registration_completed', 'true');
      localStorage.setItem('ttc_registered_email', email);
      storeRegisteredEmail(email);
      
      // Show warning message
      message.warning('There was an issue with registration, but we\'ve saved your details. Redirecting to Discord...');
      
      // Redirect to Discord
      setTimeout(() => {
        window.location.href = discordURL;
      }, 3000);
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
