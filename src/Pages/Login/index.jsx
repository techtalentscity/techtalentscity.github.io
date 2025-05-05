import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IMAGE from '../../assets/images/signupbg.png';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Form, Input, message } from 'antd';

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Google Form submission URL
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSd52W9tUiUlS_THFr9HFI_xzds11rvUq_7IfHeT-oqMPD6aCg/formResponse";
  
  // Discord redirect URL
  const discordURL = "https://discord.gg/U3RkU6gR";

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      // Create form data for submission
      const formData = new FormData();
      
      // Add entry fields with the correct Google Form field IDs
      // We're only collecting email, but the form requires first and last name
      formData.append('entry.1086641252', values.email); // Email field
      formData.append('entry.2120631500', ''); // First Name field (empty)
      formData.append('entry.976572827', ''); // Last Name field (empty)
      
      // Submit the form data
      await fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors', // Important for cross-origin requests to Google Forms
        body: formData
      });
      
      // Show success message
      message.success('Email verification successful! Redirecting to Discord...');
      
      // Clear form
      form.resetFields();
      
      // Redirect to Discord after a short delay
      setTimeout(() => {
        window.location.href = discordURL;
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Verification failed. Please try again.');
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
          <p className='font-bold text-4xl py-5'>Welcome back👋</p>
          <p className='text-[#A2A2A2]'>Please enter the email address used during registration. We will direct you to our channel if found. If not, you will be asked to register first.</p>
          <Form 
            form={form}
            layout='vertical' 
            className='pt-8'
            onFinish={handleSubmit}
          >
            <Form.Item 
              label="Email address" 
              name="email" 
              rules={[
                { required: true, message: 'Email is required' },
                { type: "email", message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="johndoe@email.com" className='p-2' />
            </Form.Item>
            
            <Button 
              type='primary' 
              htmlType="submit"
              block 
              className='p-2 !h-auto font-bold'
              loading={loading}
            >
              Check Email
            </Button>
          </Form>
          <div className="mt-6 text-center">
            <p>Don&apos;t have an account? <Link to='/register' className='text-primary font-bold'>Register with us</Link></p>
          </div>
        </Container>
      </div>
      <div className="hidden lg:w-[50%] h-full lg:flex justify-center items-center rounded-l-[60px] relative">
        <img src={IMAGE} alt="login" className='w-full h-full object-cover rounded-l-[60px]' />
        <div className="absolute top-40 left-20 2xl:left-40 inset-0 flex flex-col justify-center items-center bg-white bg-opacity-20 w-[400px] xl:w-[500px] h-[350px] text-white p-8 ">
          <h2 className="text-3xl xl:text-5xl font-bold mb-4">Community and Network Building</h2>
          <p className="text-lg text-[#F6F6F8]">Accelerate your progress and earn TechTalent badges faster through posting projects and active participation.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
