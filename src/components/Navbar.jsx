import React, { useState } from 'react';
import { Form, Input, Button, message, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  
  // Google Form URL and Discord URL
  const googleFormURL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
  const discordURL = 'https://discord.gg/YOUR_DISCORD_INVITE';
  
  // Generate a simple math problem for captcha
  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setMathProblem({
      num1,
      num2,
      answer: num1 + num2
    });
    setUserAnswer('');
  };
  
  // Verify user's captcha answer
  const verifyCaptcha = () => {
    if (parseInt(userAnswer) === mathProblem.answer) {
      setCaptchaVerified(true);
      message.success('Verification successful!');
    } else {
      setCaptchaVerified(false);
      message.error('Incorrect answer. Please try again.');
      generateMathProblem();
    }
  };
  
  // Handle form submission
  const handleSubmit = async (values) => {
    if (!captchaVerified) {
      message.error('Please verify you are human by solving the math problem');
      return;
    }
    try {
      setLoading(true);
      
      console.log('Form values to submit:', values);
      
      // Create a FormData object for more reliable form submission
      const formData = new FormData();
      
      // Add form fields with the EXACT entry IDs from the Google Form
      formData.append('entry.2120631500', values.firstName); // First Name
      formData.append('entry.976572827', values.lastName);   // Last Name
      formData.append('entry.721402290', values.email);      // Email Address
      formData.append('entry.1212098036', values.phone);     // Contact No
      formData.append('entry.2063377438', values.fieldOfStudy); // Field of Study
      
      console.log('Submitting to Google Form...');
      
      // Option 1: Direct form submission (more compatible with Google Forms)
      const formElement = document.createElement('form');
      formElement.method = 'POST';
      formElement.action = googleFormURL;
      formElement.target = '_blank'; // This will open the response in a new tab
      
      // Add all form fields
      formData.forEach((value, key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        formElement.appendChild(input);
      });
      
      // Add the form to the body and submit
      document.body.appendChild(formElement);
      formElement.submit();
      
      // Option 2: Using fetch as a backup approach
      try {
        // Allow the form submission to complete first
        setTimeout(async () => {
          try {
            // Use fetch as a backup method
            const response = await fetch(googleFormURL, {
              method: 'POST',
              mode: 'no-cors', // Important for cross-origin requests to Google Forms
              body: formData
            });
            
            console.log('Fetch backup completed');
            
            // Show success message
            message.success('Registration submitted successfully!');
            
            // Redirect to Discord after a brief delay
            setTimeout(() => {
              console.log('Redirecting to Discord...');
              window.location.href = discordURL;
            }, 2000);
            
          } catch (fetchError) {
            console.error('Fetch backup failed:', fetchError);
            // Still try to redirect even if the fetch fails
            message.success('Registration submitted! Redirecting to Discord...');
            window.location.href = discordURL;
          }
        }, 1000);
      } catch (backupError) {
        console.error('Error in backup submission:', backupError);
      }
      
      // Remove the form from the DOM
      setTimeout(() => {
        if (document.body.contains(formElement)) {
          document.body.removeChild(formElement);
        }
      }, 2000);
      
      // Clear the form
      form.resetFields();
      
      // Reset the captcha
      setCaptchaVerified(false);
      generateMathProblem();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Initialize math problem on component mount
  React.useEffect(() => {
    generateMathProblem();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col">
      <Container className="py-8">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src={logo} alt="Tech Talents City" className="w-[250px]" />
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
          
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>
            
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email address' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="Contact No"
              rules={[{ required: true, message: 'Please enter your contact number' }]}
            >
              <Input placeholder="Enter your contact number" />
            </Form.Item>
            
            <Form.Item
              name="fieldOfStudy"
              label="Field of Study"
              rules={[{ required: true, message: 'Please enter your field of study' }]}
            >
              <Input placeholder="Enter your field of study" />
            </Form.Item>
            
            {/* Captcha verification */}
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <p className="mb-2">Verify you're human: What is {mathProblem.num1} + {mathProblem.num2}?</p>
              <div className="flex gap-2">
                <Input 
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  disabled={captchaVerified}
                />
                <Button 
                  onClick={verifyCaptcha}
                  disabled={captchaVerified || !userAnswer}
                >
                  Verify
                </Button>
              </div>
              {captchaVerified && (
                <p className="text-green-500 mt-2">Verification successful!</p>
              )}
            </div>
            
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[{ 
                validator: (_, value) => 
                  value ? Promise.resolve() : Promise.reject(new Error('You must accept the Terms and Conditions'))
              }]}
            >
              <Checkbox>
                I agree to the <Link to="/terms" className="text-blue-600">Terms and Conditions</Link>
              </Checkbox>
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full rounded-2xl py-[10px] font-bold shadow-none h-auto"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          
          <div className="text-center mt-4">
            Already have an account? <Link to="/signin" className="text-blue-600">Login</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
