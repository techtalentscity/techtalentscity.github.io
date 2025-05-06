import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
// Removed logo import
import { Button, Form, Input, Select, InputNumber, Steps, Collapse, Divider } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Step } = Steps;
const { Panel } = Collapse;
const ProjectPost = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, result: 0 });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);

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

  // Google Form submission URL - Updated with your form URL
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfGi9AdtekDYxZO4nOHwkV5ZDubAy0eNzFLmS4m3KsRwPi6kg/formResponse";
  
  // Form field entry IDs from the Google Form - Updated with correct entry IDs
  const FORM_FIELDS = {
    firstName: 'entry.2120631500',
    lastName: 'entry.976572827',
    email: 'entry.1556369182',
    linkedinUrl: 'entry.662657150',
    businessName: 'entry.1975890592',
    projectTitle: 'entry.2092238618',
    projectDescription: 'entry.269184607',
    problemStatement: 'entry.862681411',
    projectGoals: 'entry.268181775',
    projectScope: 'entry.419802473',
    projectTimeline: 'entry.841236265',
    skillsRequired: 'entry.802556816',
    teamSizeNeeded: 'entry.2062579341',
    projectType: 'entry.1404652561',
    totalAmount: 'entry.1983379039'
  };

  // Store form values and move to CAPTCHA step
  const handleFormValuesSubmit = (values) => {
    setFormValues(values);
    setCurrentStep(1);
  };

  // Verify CAPTCHA and submit form if correct
  const handleVerifyCaptcha = () => {
    if (parseInt(captchaAnswer) === mathProblem.result) {
      setCaptchaVerified(true);
      submitFormToGoogle();
    } else {
      setCaptchaVerified(false);
      generateMathProblem();
      alert("Incorrect answer. Please try again.");
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
      
      // Add fields to form data - only add fields that exist in the FORM_FIELDS object
      Object.keys(FORM_FIELDS).forEach(key => {
        if (formValues[key] !== undefined && formValues[key] !== null) {
          formData.append(FORM_FIELDS[key], formValues[key].toString());
        }
      });
      
      // Submit the form data
      await fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors', // Important for cross-origin requests to Google Forms
        body: formData
      });
      
      // Show success message
      setSubmissionComplete(true);
      setCurrentStep(2);
      
      // Clear form after successful submission
      setTimeout(() => {
        form.resetFields();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Posting Guide Component
  const PostingGuide = () => (
    <div className="mb-8">
      <Collapse ghost>
        <Panel header={<span className="text-lg font-semibold text-primary">📋 Click here to view Project Posting Guide</span>} key="guide">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Project Posting Guide</h2>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Introduction</h4>
              <p className="mb-3">
                Welcome to <strong>TechTalents City</strong>! We're excited that you're ready to post a project. 
                This guide will help you understand how to properly fill out the project submission form 
                so your request can be reviewed and approved without delay.
              </p>
              <p>
                To begin with, only <strong>registered members</strong> of TechTalents City can post projects. 
                If you haven't registered yet, please do so at www.techtalentscity.com. Also, note that 
                <strong> Intermediate</strong> and <strong>Expert</strong> members are assigned exclusively 
                to <strong>paid projects</strong>, unless they voluntarily opt to work on unpaid initiatives.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Payment Structure</h4>
              <p className="mb-3">
                Payments are calculated <strong>per person</strong>, based on two main factors:
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li>The role of the participant (TechDev, TechLead, or TechArch)</li>
                <li>Their skill level (Novice, Beginner, Intermediate, or Expert)</li>
              </ul>
              <p className="mb-3">
                For instance, a TechLead with Novice-level skills might receive $500, while a TechDev at the Expert 
                level may earn up to $1,500. These amounts are just examples; actual figures may vary depending on 
                your project budget.
              </p>
              <p>
                Example: If your team includes a TechDev (Novice) paid $20, a TechArch (Beginner) paid $40, 
                and a TechLead (Expert) paid $160, your total payout would be $220. Once your project is reviewed 
                and approved, a payment link will be sent to finalize your submission.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Form Fields Explanation</h4>
              <p className="mb-2">
                <strong>Personal Information:</strong> Enter your first and last name, email address, 
                and LinkedIn profile URL. If representing a company, include the company name.
              </p>
              <p className="mb-2">
                <strong>Project Details:</strong> Provide a clear project title, description, problem statement, 
                goals, scope, and timeline.
              </p>
              <p className="mb-2">
                <strong>Project Requirements:</strong> List required skills, team size needed, whether it's a free 
                or paid project, and the total amount to be paid.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Submission Process</h4>
              <p className="mb-3">
                Once you've filled everything in, submit your project. We'll review it, and if everything is in order, 
                you'll receive a link to make payment and move forward.
              </p>
              <p>
                If you need any help during the process, feel free to reach out to us. We're here to support you!
              </p>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );

  // Project Form Step Component  
  const ProjectFormStep = () => (
    <Form 
      form={form}
      layout="vertical"
      onFinish={handleFormValuesSubmit}
      initialValues={formValues}
      className="mt-8"
    >
      {/* Personal Information Section */}
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item 
          label="First Name" 
          name="firstName" 
          rules={[{ required: true, message: 'First Name is required' }]}
        >
          <Input placeholder="John" className="p-2" />
        </Form.Item>
        
        <Form.Item 
          label="Last Name" 
          name="lastName" 
          rules={[{ required: true, message: 'Last Name is required' }]}
        >
          <Input placeholder="Doe" className="p-2" />
        </Form.Item>
      </div>
      
      <Form.Item 
        label="Email" 
        name="email" 
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input placeholder="johndoe@example.com" className="p-2" />
      </Form.Item>
      
      <Form.Item 
        label="LinkedIn Profile URL" 
        name="linkedinUrl" 
        rules={[
          { required: true, message: 'LinkedIn URL is required' },
          { type: 'url', message: 'Please enter a valid URL' }
        ]}
      >
        <Input placeholder="https://linkedin.com/in/yourprofile" className="p-2" />
      </Form.Item>
      
      <Form.Item 
        label="Business or Company Name" 
        name="businessName"
      >
        <Input placeholder="Your Company Name (if applicable)" className="p-2" />
      </Form.Item>
      
      {/* Project Details Section */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Project Details</h2>
      
      <Form.Item 
        label="Project Title" 
        name="projectTitle" 
        rules={[{ required: true, message: 'Project title is required' }]}
      >
        <Input placeholder="Enter project title" className="p-2" />
      </Form.Item>
      
      <Form.Item 
        label="Project Description" 
        name="projectDescription" 
        rules={[{ required: true, message: 'Project description is required' }]}
      >
        <TextArea 
          placeholder="Provide a detailed description of your project" 
          rows={4} 
          className="p-2"
        />
      </Form.Item>
      
      <Form.Item 
        label="Project Problem Statement" 
        name="problemStatement" 
        rules={[{ required: true, message: 'Problem statement is required' }]}
      >
        <TextArea 
          placeholder="What problem does this project solve?" 
          rows={4} 
          className="p-2"
        />
      </Form.Item>
      
      <Form.Item 
        label="Project Goals" 
        name="projectGoals" 
        rules={[{ required: true, message: 'Project goals are required' }]}
      >
        <TextArea 
          placeholder="What are the main goals of this project?" 
          rows={4} 
          className="p-2"
        />
      </Form.Item>
      
      <Form.Item 
        label="Project Scope" 
        name="projectScope" 
        rules={[{ required: true, message: 'Project scope is required' }]}
      >
        <Input placeholder="Define the scope of your project" className="p-2" />
      </Form.Item>
      
      <Form.Item 
        label="Project Timeline" 
        name="projectTimeline" 
        rules={[{ required: true, message: 'Project timeline is required' }]}
      >
        <Input placeholder="Expected timeline (e.g., 2 months, 12 weeks)" className="p-2" />
      </Form.Item>
      
      <Form.Item 
        label="Required Skill Sets" 
        name="skillsRequired" 
        rules={[{ required: true, message: 'Required skills are needed' }]}
      >
        <TextArea 
          placeholder="List all the skills required for this project" 
          rows={4} 
          className="p-2"
        />
      </Form.Item>
      
      <Form.Item 
        label="Team Size Needed" 
        name="teamSizeNeeded" 
        rules={[{ required: true, message: 'Team size is required' }]}
      >
        <InputNumber min={1} placeholder="3" className="w-full p-2" />
      </Form.Item>
      
      <Form.Item 
        label="Project Type" 
        name="projectType" 
        rules={[{ required: true, message: 'Project type is required' }]}
      >
        <Select placeholder="Select project type" className="w-full">
          <Select.Option value="free">Free Project</Select.Option>
          <Select.Option value="paid">Paid Project</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="Total Amount to Be Paid" 
        name="totalAmount"
        rules={[{ required: true, message: 'Total amount is required' }]}
      >
        <InputNumber 
          className="w-full p-2"
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          placeholder="0.00"
        />
      </Form.Item>
      
      <p className='pb-6 text-sm'>
        By continuing, you agree to the <span className='text-primary font-medium'>Terms of Service</span> and 
        acknowledge you&apos;ve read our <span className='text-primary font-medium'>Privacy Policy</span>.
      </p>
      
      <Button 
        type="primary" 
        htmlType="submit" 
        className="w-full"
        loading={loading}
      >
        Continue to Verification
      </Button>
    </Form>
  );

  // CAPTCHA Step Component
  const CaptchaStep = () => (
    <div className="mt-8">
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Verify you're human</h3>
        <p className="mb-6">Please solve this math problem to submit your project:</p>
        
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
            block
          >
            Verify & Submit
          </Button>
          
          <Button onClick={generateMathProblem} block>
            New Problem
          </Button>
          
          <Button onClick={handleBack} block>
            Back to Form
          </Button>
        </div>
      </div>
    </div>
  );

  // Success Step Component
  const SuccessStep = () => (
    <div className="mt-8 text-center">
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="text-5xl mb-4 text-green-500">✓</div>
        <h3 className="text-xl font-medium mb-4">Project Submitted Successfully!</h3>
        <p className="mb-6">Thank you for submitting your project. We will review it and get back to you soon.</p>
        
        <Button 
          type="primary" 
          onClick={() => {
            setCurrentStep(0);
            setFormValues({});
            setSubmissionComplete(false);
            generateMathProblem();
          }}
          block
        >
          Submit Another Project
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-white py-8">
      <Container className="w-full max-w-4xl px-4 md:px-8">
        {/* Removed logo section */}
        
        <h1 className="text-3xl font-bold mb-2">TTC Project Posting Form</h1>
        <p className="text-gray-600 mb-6">Submit your project to collaborate with talented individuals</p>
        
        {/* Posting Guide Section */}
        <PostingGuide />
        
        <Steps
          current={currentStep}
          className="mb-8"
          items={[
            {
              title: 'Project Information',
            },
            {
              title: 'Verification',
            },
            {
              title: 'Complete',
            },
          ]}
        />
        
        {currentStep === 0 && <ProjectFormStep />}
        {currentStep === 1 && <CaptchaStep />}
        {currentStep === 2 && <SuccessStep />}
      </Container>
    </div>
  );
};

export default ProjectPost;
