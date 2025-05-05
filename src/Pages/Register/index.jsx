import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IMAGE from '../../assets/images/signupbg.png';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Form, Input, message, Steps } from 'antd';

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState(null);
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, result: 0 });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Google Form submission URL
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSch0F2yDodefxoGh5QyvrXzl2s7Z7Y0U04Zx8hUbar0hh-RlA/formResponse";
  
  // Discord redirect URL
  const discordURL = "https://discord.gg/FwNQc7VJVk";

  // Form field entry IDs from the Google Form
  const FORM_FIELDS = {
    firstName: 'entry.2120631500',
    lastName: 'entry.976572827',
    email: 'entry.721402290',
    phone: 'entry.1212098036',
    fieldOfStudy: 'entry.2063377438'
  };

  // Generate new math problem for CAPTCHA
  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 + num2;
    
    setMathProblem({ num1, num2, result });
    setCaptchaAnswer('');
    setCaptchaVerified(false);
  };

  // Initialize with a math problem on component mount
  useEffect(() => {
    generateMathProblem();
  }, []);

  // Store form values and move to CAPTCHA step
  const handleFormValuesSubmit = (values) => {
    setFormValues(values);
    setCurrentStep(1);
  };

  // Verify CAPTCHA and submit form if correct
  const handleVerifyCaptcha = () => {
    if (parseInt(captchaAnswer) === mathProblem.result) {
      setCaptchaVerified(true);
      message.success('Verification successful!');
      submitFormToGoogle();
    } else {
      message.error('Incorrect answer. Please try again.');
      generateMathProblem();
    }
  };
  
  // Go back to the form step
  const handleBack = () => {
    setCurrentStep(0);
  };

  // Submit form to Google Form
  const submitFormToGoogle = async () => {
    if (!formValues) return;
    
    try {
      setLoading(true);
      
      // Create form data for submission
      const formData = new FormData();
      
      // Add only the fields shown in the screenshots
      formData.append(FORM_FIELDS.firstName, formValues.firstName);
      formData.append(FORM_FIELDS.lastName, formValues.lastName);
      formData.append(FORM_FIELDS.email, formValues.email);
      formData.append(FORM_FIELDS.phone, formValues.phone || '');
      formData.append(FORM_FIELDS.fieldOfStudy, formValues.fieldOfStudy || '');
      
      // Submit the form data
      await fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors', // Important for cross-origin requests to Google Forms
        body: formData
      });
      
      // Show success message
      message.success('Registration successful! Redirecting to Discord...');
      
      // Move to success step
      setCurrentStep(2);
      
      // Redirect to Discord after a short delay
      setTimeout(() => {
        window.location.href = discordURL;
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  // Form Step Component
  const FormStep = () => (
    <Form 
      layout='vertical' 
      form={form}
      onFinish={handleFormValuesSubmit}
      initialValues={formValues}
      className="mt-8"
    >
      <Form.Item 
        label="First Name" 
        name="firstName" 
        rules={[{ required: true, message: 'First Name is required' }]}
      >
        <Input placeholder="John" className='p-2' />
      </Form.Item>
      
      <Form.Item 
        label="Last Name" 
        name="lastName" 
        rules={[{ required: true, message: 'Last Name is required' }]}
      >
        <Input placeholder="Doe" className='p-2' />
      </Form.Item>
      
      <Form.Item 
        label="Email Address" 
        name="email" 
        rules={[
          { required: true, message: 'Email is required' },
          { type: "email", message: 'Please enter a valid email' }
        ]}
      >
        <Input placeholder="johndoe@email.com" className='p-2' />
      </Form.Item>
      
      <Form.Item 
        label="Contact No" 
        name="phone" 
        rules={[{ required: true, message: 'Contact number is required' }]}
      >
        <Input placeholder="+1234567890" className='p-2' />
      </Form.Item>
      
      <Form.Item 
        label="Please tell us your field of study" 
        name="fieldOfStudy" 
        rules={[{ required: true, message: 'Field of study is required' }]}
        tooltip="Kindly tell us your highest-level course of study (e.g., Nursing, Project Management, etc.)"
      >
        <Input placeholder="Computer Science" className='p-2' />
      </Form.Item>
      
      <p className='pb-6 text-sm'>
        By continuing, you agree to the <span className='text-primary font-medium'>Terms of Service</span> and 
        acknowledge you&apos;ve read our <span className='text-primary font-medium'>Privacy Policy</span>.
      </p>
      
      <Button 
        type="primary" 
        htmlType="submit" 
        block
      >
        Continue
      </Button>
    </Form>
  );

  // CAPTCHA Step Component
  const CaptchaStep = () => (
    <div className="mt-8">
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Verify you're human</h3>
        <p className="mb-6">Please solve this math problem to continue: </p>
        
        <div className="text-center mb-6">
          <span className="text-2xl font-bold">{mathProblem.num1} + {mathProblem.num2} = ?</span>
        </div>
        
        <Input 
          placeholder="Enter your answer" 
          className="p-2 mb-4" 
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          type="number"
        />
        
        <div className="flex flex-col gap-3">
          <Button 
            type="primary" 
            onClick={handleVerifyCaptcha}
            loading={loading}
            disabled={!captchaAnswer}
            block
          >
            Verify & Submit
          </Button>
          
          <Button onClick={generateMathProblem} block>
            New Problem
          </Button>
          
          <Button onClick={handleBack} block>
            Back
          </Button>
        </div>
      </div>
    </div>
  );

  // Success Step Component
  const SuccessStep = () => (
    <div className="mt-8 text-center">
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-xl font-medium mb-4">Registration Successful!</h3>
        <p className="mb-6">Thank you for registering. You will be redirected to our Discord community shortly...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full flex items-center min-h-screen bg-white">
      <div className="w-full lg:w-[50%] flex justify-center items-center overflow-y-auto scrollbar-hide md:min-h-screen pt-12 md:pt-0">
        <Container className={'md:!px-16 lg:!px-0 md:min-h-screen pt-6 md:pt-12 pb-12'}>
          <Link to={'/'}>
            <img src={logo} alt="logo" className="w-[250px] object-cover object-center" />
          </Link>
          <p className='font-bold text-4xl py-5'>Welcome to TechTalents City👋</p>
          <p className='text-[#A2A2A2]'>Kindly fill in your details below to create an account</p>
          
          <Steps
            current={currentStep}
            className="mb-6"
            items={[
              {
                title: 'Information',
              },
              {
                title: 'Verification',
              },
              {
                title: 'Complete',
              },
            ]}
          />
          
          {currentStep === 0 && <FormStep />}
          {currentStep === 1 && <CaptchaStep />}
          {currentStep === 2 && <SuccessStep />}
          
          <div className="mt-6 text-center">
            <p>Already have an account? <Link to='/signin' className='text-primary font-bold'>Log In</Link></p>
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
