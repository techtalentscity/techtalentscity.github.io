import { Link, useNavigate } from 'react-router-dom';
import IMAGE from '../../assets/images/signupbg.png';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Form, Input, message, Steps, theme } from 'antd';
import { useState, useEffect } from 'react';
import { UserOutlined, SolutionOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, result: 0 });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { token } = theme.useToken();

  // Updated Google Form submission URL
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSch0F2yDodefxoGh5QyvrXzl2s7Z7Y0U04Zx8hUbar0hh-RlA/formResponse";
  
  // Discord redirect URL
  const discordURL = "https://discord.gg/FwNQc7VJVk";

  // Generate new math problem
  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 + num2;
    
    setMathProblem({ num1, num2, result });
    setCaptchaVerified(false);
    form.setFieldsValue({ captcha: '' });
  };

  // Initialize with a math problem on component mount
  useEffect(() => {
    generateMathProblem();
  }, []);

  // Verify captcha
  const verifyCaptcha = () => {
    const userAnswer = form.getFieldValue('captcha');
    
    if (parseInt(userAnswer) === mathProblem.result) {
      setCaptchaVerified(true);
      message.success('Verification successful!');
    } else {
      setCaptchaVerified(false);
      message.error('Incorrect answer. Please try again.');
      generateMathProblem();
    }
  };

  // Handle next step
  const next = async () => {
    try {
      // Validate current step fields based on the updated form structure
      await form.validateFields(
        currentStep === 0 ? ['firstName', 'lastName', 'email', 'phone'] :
        currentStep === 1 ? ['fieldOfStudy'] : 
        ['captcha']
      );
      
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle previous step
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    if (!captchaVerified) {
      message.error('Please verify you are human by solving the math problem');
      return;
    }

    try {
      setLoading(true);
      
      // Creating a hidden form for submission
      const hiddenForm = document.createElement('form');
      hiddenForm.method = 'POST';
      hiddenForm.action = googleFormURL;
      hiddenForm.target = '_blank'; // This opens the response in a new tab
      hiddenForm.style.display = 'none';
      
      // Adding the updated form fields with the correct entry IDs
      const fields = {
        'entry.2120631500': values.firstName || '',
        'entry.976572827': values.lastName || '',
        'entry.721402290': values.email || '',
        'entry.1212098036': values.phone || '',
        'entry.2063377438': values.fieldOfStudy || '',
        'fvv': '1',
        'draftResponse': '[]',
        'pageHistory': '0',
        'fbzx': '-569501532876574451' // Updated form ID from the form HTML
      };
      
      // Create hidden inputs for each field
      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        hiddenForm.appendChild(input);
      });
      
      // Add the form to the body
      document.body.appendChild(hiddenForm);
      
      // Submit the form
      hiddenForm.submit();
      
      // Remove the form from the DOM after submission
      setTimeout(() => {
        document.body.removeChild(hiddenForm);
      }, 500);
      
      // Show success message
      message.success('Registration successful! Redirecting to Discord...');
      
      // Clear form
      form.resetFields();
      
      // Reset captcha verification
      setCaptchaVerified(false);
      generateMathProblem();
      
      // Redirect to Discord after a short delay
      setTimeout(() => {
        window.location.href = discordURL;
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Updated steps configuration to match the simplified Google Form
  const steps = [
    {
      title: 'Personal Info',
      icon: <UserOutlined />,
      content: (
        <>
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
        </>
      ),
    },
    {
      title: 'Field of Study',
      icon: <SolutionOutlined />,
      content: (
        <>
          <Form.Item 
            label="Field of Study" 
            name="fieldOfStudy" 
            rules={[{ required: true, message: 'Field of study is required' }]}
            tooltip="Kindly tell us your field of study (e.g., Computer Science, Nursing, Project Management, etc.)"
          >
            <Input placeholder="Computer Science" className='p-2' />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Verification',
      icon: <CheckCircleOutlined />,
      content: (
        <>
          <div className="bg-gray-100 p-4 mb-6 rounded-md">
            <p className="font-medium mb-2">Verify you're human</p>
            <p className="mb-4">Solve this simple math problem: {mathProblem.num1} + {mathProblem.num2} = ?</p>
            
            <Form.Item 
              name="captcha" 
              rules={[{ required: true, message: 'Please solve the math problem' }]}
            >
              <Input 
                placeholder="Enter your answer" 
                className='p-2 mb-2' 
                type="number"
              />
            </Form.Item>
            
            <div className="flex gap-2">
              <Button 
                onClick={verifyCaptcha} 
                className="font-medium"
              >
                Verify
              </Button>
              <Button 
                onClick={generateMathProblem} 
                className="font-medium"
              >
                New Problem
              </Button>
            </div>
            
            {captchaVerified && (
              <div className="mt-2 text-green-600 font-medium">
                ✓ Verification successful
              </div>
            )}
          </div>
          
          <p className='pb-6 text-sm'>
            By continuing, you agree to the <span className='text-primary font-medium'>Terms of Service</span> and 
            acknowledge you&apos;ve read our <span className='text-primary font-medium'>Privacy Policy</span>.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="w-full flex items-center min-h-screen bg-white">
      <div className="w-full lg:w-[50%] flex justify-center items-center overflow-y-auto scrollbar-hide md:min-h-screen pt-12 md:pt-0">
        <Container className={'md:!px-16 lg:!px-0 md:min-h-screen pt-6 md:pt-12 pb-12'}>
          <Link to={'/'}>
            <img src={logo} alt="logo" className="w-[250px] object-cover object-center" />
          </Link>
          <p className='font-bold text-4xl py-5'>Welcome to TechTalents City👋</p>
          <p className='text-[#A2A2A2]'>Kindly fill in your details below to create an account</p>
          
          <div className="mt-8 mb-8">
            <Steps
              current={currentStep}
              items={steps.map(item => ({
                title: item.title,
                icon: item.icon,
              }))}
            />
          </div>
          
          <Form 
            layout='vertical' 
            form={form}
            onFinish={handleSubmit}
            className="mt-8"
          >
            <div className="steps-content">
              {steps[currentStep].content}
            </div>
            <div className="steps-action mt-6 flex justify-between">
              {currentStep > 0 && (
                <Button 
                  style={{ margin: '0 8px' }} 
                  onClick={prev}
                >
                  Previous
                </Button>
              )}
              
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={next}>
                  Next
                </Button>
              )}
              
              {currentStep === steps.length - 1 && (
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  disabled={!captchaVerified}
                >
                  Register with us
                </Button>
              )}
            </div>
          </Form>
          
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
