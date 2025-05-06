import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
// Removed logo import
import { Button, Form, Input, Select, Steps, Collapse } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Panel } = Collapse;
const { Step } = Steps;

const Application = () => {
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

  // Google Form submission URL
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdutVajcCzd-S2wuFfUNbnkx8KoklFFn8clR0xbYG9XBRdkvg/formResponse";
  
  // Form field entry IDs from the Google Form
  const FORM_FIELDS = {
    firstName: 'entry.2120631500',
    lastName: 'entry.976572827',
    email: 'entry.1556369182',
    projectTitle: 'entry.2092238618',
    badgeRole: 'entry.479992417',
    skills: 'entry.399656188',
    skillLevel: 'entry.387826858',
    contactNumber: 'entry.1680754078'
  };

  // URL for viewing all available projects
  const projectsListURL = "/projects"; // Update this with your actual projects listing page URL

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

  // Application Guide Component
  const ApplicationGuide = () => (
    <div className="mb-8">
      <Collapse ghost>
        <Panel header={<span className="text-lg font-semibold text-primary">📋 Click here to view Project Application Guide</span>} key="guide">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Project Application Guide</h2>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Introduction</h4>
              <p className="mb-3">
                Welcome to <strong>Project Application Form</strong>! We're excited that you're interested in applying to work on a project. 
                This guide will help you understand what information you need to provide in your application.
              </p>
              <p>
                Please note that only <strong>registered members</strong> can apply to projects. 
                If you haven't registered yet, please do so first.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Project Selection</h4>
              <p className="mb-3">
                To start, you'll need to <strong>enter the title of the project</strong> you are applying for. This should be clear and concise.
              </p>
              <p className="mb-2">
                👉 <em>If you're unsure of the project title, <Link to={projectsListURL} className="text-primary font-medium">click here to view all available projects</Link>.</em>
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Badge Roles</h4>
              <p className="mb-3">
                Next, <strong>select the badge role</strong> that best represents your expected contribution to the project. Badge roles reflect the area in which you'll be most active:
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li><strong>TechMO</strong> – Mentors</li>
                <li><strong>TechQA</strong> – Quality Assurance/Testers</li>
                <li><strong>TechLeads</strong> – Non-technical contributors</li>
                <li><strong>TechArchs</strong> – Low-code/No-code developers</li>
                <li><strong>TechGuard</strong> – Network and Cybersecurity</li>
                <li><strong>TechDev</strong> – Coding Developers</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Skill Levels</h4>
              <p className="mb-3">
                You will then be asked to <strong>indicate your skill level</strong>, based on the number of projects you've completed within your domain:
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li><strong>Novice</strong> – 2 or more completed projects</li>
                <li><strong>Beginner</strong> – 5 or more completed projects</li>
                <li><strong>Intermediate</strong> – 10 or more completed projects</li>
                <li><strong>Expert</strong> – 15 or more completed projects</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Relevant Skills</h4>
              <p className="mb-3">
                After that, <strong>enter the skills you have</strong> that are relevant to your chosen role. These may include:
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li><strong>Technical skills</strong> such as programming, cloud tools, design, or data analysis</li>
                <li><strong>Non-technical skills</strong> such as communication, research, planning, or user testing</li>
              </ul>
              <p>
                Make sure your skills align with the requirements of the project and the role you selected.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Application Process</h4>
              <p className="mb-3">
                Once you submit your application, our team will review it to determine if your skills 
                and experience match the project requirements. If selected, you’ll receive further instructions to begin your project onboarding and connect with your team.
              </p>
              <p>
                By submitting a well-prepared application, you increase your chances of being selected and positioned 
                where your skills can make the greatest impact.
              </p>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );

  // Application Form Step Component
  const ApplicationFormStep = () => (
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
          <Input placeholder="Enter your first name" className="p-2" />
        </Form.Item>
        
        <Form.Item 
          label="Last Name" 
          name="lastName" 
          rules={[{ required: true, message: 'Last Name is required' }]}
        >
          <Input placeholder="Enter your last name" className="p-2" />
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
        <Input placeholder="Enter your email address" className="p-2" />
      </Form.Item>
      
      {/* Project Information Section */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Project Information</h2>
      
      <Form.Item 
        label="Project Title" 
        name="projectTitle" 
        rules={[{ required: true, message: 'Project title is required' }]}
      >
        <Input placeholder="Enter the title of the project you're applying for" className="p-2" />
      </Form.Item>
      
      <Form.Item 
        label="Badge Role" 
        name="badgeRole" 
        rules={[{ required: true, message: 'Badge role is required' }]}
      >
        <Select placeholder="Select your badge role" className="w-full">
          <Select.Option value="TechMO">TechMO – Mentors</Select.Option>
          <Select.Option value="TechQA">TechQA – Quality Assurance/Testers</Select.Option>
          <Select.Option value="TechLeads">TechLeads – Non-technical contributors</Select.Option>
          <Select.Option value="TechArchs">TechArchs – Low-code/No-code developers</Select.Option>
          <Select.Option value="TechGuard">TechGuard – Network and Cybersecurity</Select.Option>
          <Select.Option value="TechDev">TechDev – Coding Developers</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="Enter the skills you have" 
        name="skills" 
        rules={[{ required: true, message: 'Skills are required' }]}
      >
        <TextArea 
          placeholder="List your relevant technical and non-technical skills" 
          rows={4} 
          className="p-2"
        />
      </Form.Item>
      
      <Form.Item 
        label="Indicate Your Badge Skill Level" 
        name="skillLevel" 
        rules={[{ required: true, message: 'Skill level is required' }]}
      >
        <Select placeholder="Select your skill level" className="w-full">
          <Select.Option value="Novice">Novice – 2 or more completed projects</Select.Option>
          <Select.Option value="Beginner">Beginner – 5 or more completed projects</Select.Option>
          <Select.Option value="Intermediate">Intermediate – 10 or more completed projects</Select.Option>
          <Select.Option value="Expert">Expert – 15 or more completed projects</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="Please enter your contact number" 
        name="contactNumber" 
        rules={[{ required: true, message: 'Contact number is required' }]}
      >
        <Input placeholder="Enter your phone number" className="p-2" />
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
        <p className="mb-6">Please solve this math problem to submit your application:</p>
        
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
        <h3 className="text-xl font-medium mb-4">Application Submitted Successfully!</h3>
        <p className="mb-6">Thank you for submitting your application. We will review it and get back to you soon.</p>
        
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
          Submit Another Application
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-white py-8">
      <Container className="w-full max-w-4xl px-4 md:px-8">
        {/* Removed logo section */}
        
        <h1 className="text-3xl font-bold mb-2">Apply to a Project</h1>
        <p className="text-gray-600 mb-6">Join a project and collaborate with talented individuals</p>
        
        {/* Application Guide Section */}
        <ApplicationGuide />
        
        <Steps
          current={currentStep}
          className="mb-8"
          items={[
            {
              title: 'Application Form',
            },
            {
              title: 'Verification',
            },
            {
              title: 'Complete',
            },
          ]}
        />
        
        {currentStep === 0 && <ApplicationFormStep />}
        {currentStep === 1 && <CaptchaStep />}
        {currentStep === 2 && <SuccessStep />}
        
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>
            By applying, you agree to the <span className="text-primary font-medium">Terms of Service</span> and 
            acknowledge you've read our <span className="text-primary font-medium">Privacy Policy</span>.
          </p>
          <p className="mt-2">
            Only registered members will be granted access to projects upon acceptance.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Application;
