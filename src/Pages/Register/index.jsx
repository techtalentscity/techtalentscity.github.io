import { Link, useNavigate } from 'react-router-dom';
import IMAGE from '../../assets/images/signupbg.png';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Form, Input, message, Select, Radio, Steps, theme } from 'antd';
import { useState, useEffect } from 'react';
import { UserOutlined, SolutionOutlined, BankOutlined, CheckCircleOutlined } from '@ant-design/icons';
const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, result: 0 });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { token } = theme.useToken();

  // Google Form submission URL - updated with the actual form URL
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSch0F2yDodefxoGh5QyvrXzl2s7Z7Y0U04Zx8hUbar0hh-RlA/formResponse";
  
  // Discord redirect URL
  const discordURL = "https://discord.gg/FwNQc7VJVk";

  // Form field entry IDs from the Google Form - updated with correct entry IDs
  const FORM_FIELDS = {
    firstName: 'entry.2120631500',
    lastName: 'entry.976572827',
    email: 'entry.721402290',
    phone: 'entry.1212098036',
    address: 'entry.219720729',
    fieldOfStudy: 'entry.2063377438',
    linkedinURL: 'entry.1917214759',
    education: 'entry.1274339765',
    ethnicity: 'entry.2100632816',    // Updated to match Google Form
    country: 'entry.1993189343',
    participationType: 'entry.297604174',
    businessName: 'entry.704048168',
    businessWebsite: 'entry.810219629',
    businessAddress: 'entry.1439399845'
  };

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
      // Validate current step fields
      await form.validateFields(
        currentStep === 0 ? ['firstName', 'lastName', 'email', 'phone', 'address'] :
        currentStep === 1 ? ['fieldOfStudy', 'linkedinURL', 'education', 'ethnicity', 'country'] :
        currentStep === 2 ? ['participationType', 'businessName', 'businessWebsite', 'businessAddress'] : 
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
      
      // Create form data for submission
      const formData = new FormData();
      
      // Add entry fields with the correct Google Form field IDs
      formData.append(FORM_FIELDS.firstName, values.firstName);
      formData.append(FORM_FIELDS.lastName, values.lastName);
      formData.append(FORM_FIELDS.email, values.email);
      formData.append(FORM_FIELDS.phone, values.phone || '');
      formData.append(FORM_FIELDS.address, values.address || '');
      formData.append(FORM_FIELDS.fieldOfStudy, values.fieldOfStudy || '');
      formData.append(FORM_FIELDS.linkedinURL, values.linkedinURL || '');
      formData.append(FORM_FIELDS.education, values.education || '');
      formData.append(FORM_FIELDS.ethnicity, values.ethnicity || '');
      formData.append(FORM_FIELDS.country, values.country || '');
      formData.append(FORM_FIELDS.participationType, values.participationType || 'As an Individual');
      formData.append(FORM_FIELDS.businessName, values.businessName || 'N/A');
      formData.append(FORM_FIELDS.businessWebsite, values.businessWebsite || 'N/A');
      formData.append(FORM_FIELDS.businessAddress, values.businessAddress || 'N/A');
      
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
      
      // Reset captcha verification
      setCaptchaVerified(false);
      generateMathProblem();
      
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
  
  // Steps configuration
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
          
          <Form.Item 
            label="Address" 
            name="address" 
            rules={[{ required: true, message: 'Address is required' }]}
          >
            <Input.TextArea 
              placeholder="123 Main St, City, Country" 
              className='p-2' 
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Education',
      icon: <SolutionOutlined />,
      content: (
        <>
          <Form.Item 
            label="Field of Study" 
            name="fieldOfStudy" 
            rules={[{ required: true, message: 'Field of study is required' }]}
            tooltip="Kindly tell us your highest-level course of study (e.g., Nursing, Project Management, etc.)"
          >
            <Input placeholder="Computer Science" className='p-2' />
          </Form.Item>
          
          <Form.Item 
            label="LinkedIn Profile URL" 
            name="linkedinURL" 
            rules={[
              { required: true, message: 'LinkedIn profile URL is required' },
              { type: "url", message: 'Please enter a valid URL' }
            ]}
            tooltip="Share the link to your LinkedIn profile"
          >
            <Input placeholder="https://linkedin.com/in/yourprofile" className='p-2' />
          </Form.Item>
          
          <Form.Item 
            label="Highest Level of Education" 
            name="education" 
            rules={[{ required: true, message: 'Education level is required' }]}
          >
            <Select placeholder="Select your education level">
              <Select.Option value="High School Diploma or Equivalent">High School Diploma or Equivalent</Select.Option>
              <Select.Option value="Associate Degree">Associate Degree</Select.Option>
              <Select.Option value="Bachelor's Degree">Bachelor's Degree</Select.Option>
              <Select.Option value="Master's Degree">Master's Degree</Select.Option>
              <Select.Option value="Professional Degree (e.g., JD, MD)">Professional Degree (e.g., JD, MD)</Select.Option>
              <Select.Option value="Doctorate (Ph.D., Ed.D., etc.)">Doctorate (Ph.D., Ed.D., etc.)</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            label="Ethnicity" 
            name="ethnicity" 
            rules={[{ required: true, message: 'Ethnicity is required' }]}
            tooltip="Your response is confidential and will be used for demographic insights only"
          >
            <Select placeholder="Select your ethnicity">
              <Select.Option value="African">African</Select.Option>
              <Select.Option value="African American">African American</Select.Option>
              <Select.Option value="Asian">Asian</Select.Option>
              <Select.Option value="Hispanic / Latino">Hispanic / Latino</Select.Option>
              <Select.Option value="Native American / Indigenous">Native American / Indigenous</Select.Option>
              <Select.Option value="Middle Eastern / North African">Middle Eastern / North African</Select.Option>
              <Select.Option value="Pacific Islander">Pacific Islander</Select.Option>
              <Select.Option value="White / Caucasian">White / Caucasian</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            label="Country of Residence" 
            name="country" 
            rules={[{ required: true, message: 'Country is required' }]}
          >
            <Input placeholder="United States" className='p-2' />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Business Info',
      icon: <BankOutlined />,
      content: (
        <>
          <Form.Item 
            label="How would you like to participate?" 
            name="participationType" 
            rules={[{ required: true, message: 'Participation type is required' }]}
            initialValue="As an Individual"
          >
            <Radio.Group>
              <Radio value="As an Individual">As an Individual</Radio>
              <Radio value="As a Company">As a Company</Radio>
              <Radio value="In Both Capacities">In Both Capacities</Radio>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item 
            label="Business or Company Name" 
            name="businessName" 
            tooltip="If you are not representing a company, please enter 'N/A'"
            initialValue="N/A"
          >
            <Input placeholder="Company Name or N/A" className='p-2' />
          </Form.Item>
          
          <Form.Item 
            label="Business Website" 
            name="businessWebsite" 
            tooltip="If you are not representing a company, please enter 'N/A'"
            initialValue="N/A"
          >
            <Input placeholder="https://company.com or N/A" className='p-2' />
          </Form.Item>
          
          <Form.Item 
            label="Business Address" 
            name="businessAddress" 
            tooltip="If you are not representing a company, please enter 'N/A'"
            initialValue="N/A"
          >
            <Input.TextArea 
              placeholder="Business Address or N/A" 
              className='p-2' 
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
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
