import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Form, Input, Select, Steps, Collapse } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Panel } = Collapse;
const { Step } = Steps;

// Form field entry IDs from the Google Form - moved outside component for better performance
const FORM_FIELDS = {
  fullName: 'entry.2120631500',
  emailAddress: 'entry.289230066',
  whatDoYouLikeDoing: 'entry.826500830',
  workingFor: 'entry.90149729',
  preferToWork: 'entry.103804273',
  learningComfort: 'entry.126397704',
  techExcitement: 'entry.2046710176',
  techAreas: 'entry.1595563124',
  techActivities: 'entry.608716717',
  personalStrength: 'entry.1388922789',
  motivation: 'entry.1879980715',
  experienceLevel: 'entry.75336198',
  emergingAreas: 'entry.614410637',
  certifications: 'entry.1379512189',
  certificationsList: 'entry.1262447611',
  toolsUsed: 'entry.141495548',
  timeCommitment: 'entry.44204949',
  workImpact: 'entry.2125471600',
  guidanceNeeded: 'entry.1508247044',
  futureGoals: 'entry.686755157'
};

const TTCCareerForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: '',
    emailAddress: '',
    whatDoYouLikeDoing: '',
    workingFor: '',
    preferToWork: '',
    learningComfort: '',
    techExcitement: '',
    techAreas: '',
    techActivities: '',
    personalStrength: '',
    motivation: '',
    experienceLevel: '',
    emergingAreas: '',
    certifications: '',
    certificationsList: '',
    toolsUsed: '',
    timeCommitment: '',
    workImpact: '',
    guidanceNeeded: '',
    futureGoals: ''
  });
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, result: 0 });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  // Google Form submission URL
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSe1ZJ2I0uhJg1xDywYRgwaYpqBGzwAg-zIZ-Exjey2CORZhvA/formResponse";
  
  // Generate new math problem for CAPTCHA - wrapped in useCallback
  const generateMathProblem = useCallback(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 + num2;
    
    setMathProblem({ num1, num2, result });
    setCaptchaAnswer('');
    setCaptchaVerified(false);
  }, []);

  // Initialize with a math problem on component mount
  useEffect(() => {
    generateMathProblem();
  }, [generateMathProblem]);

  // Store form values and move to CAPTCHA step
  const handleFormValuesSubmit = (values) => {
    setFormValues(values);
    setCurrentStep(1);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Verify CAPTCHA and submit form if correct
  const handleVerifyCaptcha = () => {
    try {
      const userAnswer = parseInt(captchaAnswer, 10);
      if (userAnswer === mathProblem.result) {
        setCaptchaVerified(true);
        submitFormToGoogleSheet();
      } else {
        setCaptchaVerified(false);
        generateMathProblem();
        setErrorMessage("Incorrect answer. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying CAPTCHA:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  
  // Go back to the form step
  const handleBack = () => {
    setCurrentStep(0);
    setErrorMessage("");
  };

  // Submit form to Google Form/Sheet
  const submitFormToGoogleSheet = async () => {
    if (!formValues) return;
    
    try {
      setLoading(true);
      setErrorMessage("");
      
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
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setFormValues({
      fullName: '',
      emailAddress: '',
      whatDoYouLikeDoing: '',
      workingFor: '',
      preferToWork: '',
      learningComfort: '',
      techExcitement: '',
      techAreas: '',
      techActivities: '',
      personalStrength: '',
      motivation: '',
      experienceLevel: '',
      emergingAreas: '',
      certifications: '',
      certificationsList: '',
      toolsUsed: '',
      timeCommitment: '',
      workImpact: '',
      guidanceNeeded: '',
      futureGoals: ''
    });
    setSubmissionComplete(false);
    generateMathProblem();
    setErrorMessage("");
  }, [generateMathProblem]);

  // Career Guide Component
  const CareerGuide = () => (
    <div className="mb-8">
      <Collapse ghost>
        <Panel header={<span className="text-lg font-semibold text-primary">🧭 Click here to view Career Test Guide</span>} key="guide">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Career Test Guide</h2>
            <p className="mb-4">
              Welcome to the <strong>TechTalents City Career Test</strong> — a personalized tool designed to help you explore your potential and clarify your direction in the tech industry. This is more than a typical test. It's an opportunity to reflect on your strengths, interests, and motivations, and to align them with meaningful opportunities in tech.
            </p>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Work Style</h4>
              <p className="mb-2">
                We explore your <strong>preferred work style</strong>. Some people work best independently, others thrive in collaborative teams or aspire to lead initiatives.
              </p>
              <ul className="list-disc pl-6 mb-2 text-sm">
                <li>Working independently on solo projects</li>
                <li>Collaborating within a team</li>
                <li>Leading others and managing the vision</li>
                <li>Being flexible across work styles</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Learning Comfort</h4>
              <p className="mb-2">
                We assess your <strong>learning comfort level</strong>, especially around tools and programming languages.
              </p>
              <ul className="list-disc pl-6 mb-2 text-sm">
                <li>Very comfortable – I pick things up quickly</li>
                <li>Somewhat comfortable – I may need extra time</li>
                <li>Not comfortable – I need structured support</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Motivations & Organization Type</h4>
              <p className="mb-2">
                Your <strong>motivations for working in tech</strong> and <strong>preferred type of organization</strong> help us match you with relevant opportunities.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Tech Areas</h4>
              <p className="mb-2">
                We explore your <strong>areas of curiosity in tech</strong>, such as:
              </p>
              <ul className="list-disc pl-6 mb-2 text-sm">
                <li>Software Development</li>
                <li>Cybersecurity</li>
                <li>Artificial Intelligence & Machine Learning</li>
                <li>Product Management</li>
                <li>UX/UI Design</li>
                <li>Data Analysis & Engineering</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Personal Strengths & Time Commitment</h4>
              <p className="mb-2">
                You'll reflect on your <strong>personal strengths</strong>, any <strong>certifications</strong>, and your <strong>weekly time commitment</strong> for realistic project recommendations.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Goals & Impact</h4>
              <p className="mb-2">
                Finally, we'll ask about your <strong>short-term goals</strong>, the <strong>impact you want to create</strong>, and your <strong>12-month vision</strong> for your tech journey.
              </p>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );

  // Steps component for tracking progress
  const StepsComponent = () => (
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
  );

  // Form Step Component
  const ApplicationFormStep = () => (
    <Form 
      form={form}
      layout="vertical"
      onFinish={handleFormValuesSubmit}
      initialValues={formValues}
      className="mt-8"
    >
      <h1 className="text-3xl font-bold mb-2">TTC Career Test</h1>
      <p className="text-gray-600 mb-6">Join TechTalents City and explore your tech career possibilities</p>
      
      {/* Application Guide Section */}
      <CareerGuide />
      
      <StepsComponent />
      
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{errorMessage}</p>
        </div>
      )}
      
      {/* Personal Information Section */}
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Form.Item 
          label="Full Name" 
          name="fullName" 
          rules={[{ required: true, message: 'Full Name is required' }]}
        >
          <Input placeholder="Enter your full name" className="p-2" />
        </Form.Item>
        
        <Form.Item 
          label="Email Address" 
          name="emailAddress" 
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter your email address" className="p-2" />
        </Form.Item>
      </div>
      
      {/* Career Information Section */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Career Information</h2>
      
      <Form.Item 
        label="What do you like doing best?" 
        name="whatDoYouLikeDoing" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <TextArea 
          placeholder="Describe your favorite activities or tasks" 
          rows={3} 
          className="p-2"
        />
      </Form.Item>
      
      <Form.Item 
        label="Are you more interested in working for:" 
        name="workingFor" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select an option">
          <Select.Option value="Startups">Startups and entrepreneurial ventures</Select.Option>
          <Select.Option value="Large tech companies">Large tech companies</Select.Option>
          <Select.Option value="Nonprofit organizations">Nonprofit or mission-driven organizations</Select.Option>
          <Select.Option value="Government">Private sector or government agencies</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="How do you prefer to work?" 
        name="preferToWork" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select an option">
          <Select.Option value="Working independently">Working independently on solo projects</Select.Option>
          <Select.Option value="Collaborating in teams">Collaborating within a team</Select.Option>
          <Select.Option value="Leading others">Leading others and managing the vision</Select.Option>
          <Select.Option value="Flexible">Being flexible and adaptable across work styles</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="How comfortable are you with learning new tools or programming languages?" 
        name="learningComfort" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select an option">
          <Select.Option value="Very comfortable">Very comfortable – I pick things up quickly</Select.Option>
          <Select.Option value="Somewhat comfortable">Somewhat comfortable – I may need extra time</Select.Option>
          <Select.Option value="Not comfortable">Not comfortable – I need structured support</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="What excites you most about working in tech?" 
        name="techExcitement" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select an option">
          <Select.Option value="Solving complex problems">Solving complex problems</Select.Option>
          <Select.Option value="Building applications">Building applications and platforms</Select.Option>
          <Select.Option value="Exploring data">Exploring data and gaining insights</Select.Option>
          <Select.Option value="System security">Ensuring system security and reliability</Select.Option>
          <Select.Option value="Innovation">Driving real-world innovation and impact</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="Which tech areas are you most curious about or interested in learning?" 
        name="techAreas" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select your primary interest">
          <Select.Option value="Software Development">Software Development</Select.Option>
          <Select.Option value="Cybersecurity">Cybersecurity</Select.Option>
          <Select.Option value="AI/ML">Artificial Intelligence & Machine Learning</Select.Option>
          <Select.Option value="Blockchain">Blockchain & Web3</Select.Option>
          <Select.Option value="Product Management">Product Management</Select.Option>
          <Select.Option value="UX/UI Design">UX/UI Design</Select.Option>
          <Select.Option value="Data Analysis">Data Analysis & Engineering</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="Which tech-related activities have you enjoyed the most so far?" 
        name="techActivities" 
        rules={[{ required: true, message: 'This field is required' }]}
        extra="Even if it's informal — e.g., tinkering with websites, playing with data, cybersecurity games, etc."
      >
        <TextArea 
          placeholder="Describe activities you've enjoyed" 
          rows={3} 
          className="p-2"
        />
      </Form.Item>
      
      <Form.Item 
        label="What is one personal strength you believe will help you succeed in tech?" 
        name="personalStrength" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input 
          placeholder="E.g., creativity, communication, leadership, perseverance" 
          className="p-2" 
        />
      </Form.Item>
      
      <Form.Item 
        label="What is your biggest motivation for pursuing a tech career?" 
        name="motivation" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input 
          placeholder="What drives you toward technology?" 
          className="p-2" 
        />
      </Form.Item>
      
      <Form.Item 
        label="Which of these best describes your current experience level in tech?" 
        name="experienceLevel" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select your experience level">
          <Select.Option value="Beginner">Beginner - Just starting out</Select.Option>
          <Select.Option value="Novice">Novice - Some basic knowledge</Select.Option>
          <Select.Option value="Intermediate">Intermediate - Completed projects</Select.Option>
          <Select.Option value="Advanced">Advanced - Professional experience</Select.Option>
          <Select.Option value="Expert">Expert - Many years of experience</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="Are you open to working in emerging areas like AI, Blockchain, or Cybersecurity if given the right support?" 
        name="emergingAreas" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select your answer">
          <Select.Option value="Yes">Yes</Select.Option>
          <Select.Option value="No">No</Select.Option>
          <Select.Option value="Maybe">Maybe</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="Do you already have any certifications or completed courses?" 
        name="certifications" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select your answer">
          <Select.Option value="Yes">Yes</Select.Option>
          <Select.Option value="No">No</Select.Option>
          <Select.Option value="In Progress">In Progress</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="List Any Certifications that you have"
        name="certificationsList" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <TextArea 
          placeholder="Enter 'None' if you don't have any" 
          rows={2} 
          className="p-2"
        />
      </Form.Item>
      
      <Form.Item 
        label="Which of the following tools or platforms have you used before?" 
        name="toolsUsed" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input 
          placeholder="E.g., GitHub, Figma, Python, JavaScript, Google Cloud" 
          className="p-2" 
        />
      </Form.Item>
      
      <Form.Item 
        label="How much time can you realistically commit to learning or working on a project each week?" 
        name="timeCommitment" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select your answer">
          <Select.Option value="1-5 hours">1-5 hours</Select.Option>
          <Select.Option value="5-10 hours">5-10 hours</Select.Option>
          <Select.Option value="10-20 hours">10-20 hours</Select.Option>
          <Select.Option value="20+ hours">20+ hours</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="What type of impact do you want your work to have?" 
        name="workImpact" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select your answer">
          <Select.Option value="Empowering communities">Empowering underrepresented communities</Select.Option>
          <Select.Option value="Business solutions">Building business-focused solutions</Select.Option>
          <Select.Option value="Healthcare innovation">Advancing innovation in science or healthcare</Select.Option>
          <Select.Option value="Education">Supporting global education</Select.Option>
          <Select.Option value="Financial systems">Improving financial systems</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="What kind of guidance do you need most right now?" 
        name="guidanceNeeded" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select your answer">
          <Select.Option value="Skill roadmap">A skill development roadmap</Select.Option>
          <Select.Option value="Project matching">Matching with suitable projects</Select.Option>
          <Select.Option value="Career mentorship">Career mentorship</Select.Option>
          <Select.Option value="Portfolio help">Help with your resume or portfolio</Select.Option>
          <Select.Option value="All of the above">All of the above</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item 
        label="In the next 12 months, where would you like to be in your tech journey?" 
        name="futureGoals" 
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select placeholder="Select your answer">
          <Select.Option value="Starting first project">Starting your first real-world project</Select.Option>
          <Select.Option value="Securing position">Securing an internship or full-time position</Select.Option>
          <Select.Option value="Building portfolio">Building and showcasing a complete portfolio</Select.Option>
          <Select.Option value="Leading team">Leading a team or managing a technical initiative</Select.Option>
        </Select>
      </Form.Item>
      
      <p className="pb-6 text-sm text-gray-600">
        By continuing, you agree to the <span className="text-primary font-medium">Terms of Service</span> and 
        acknowledge you've read our <span className="text-primary font-medium">Privacy Policy</span>.
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
  const VerificationStep = () => (
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
  const CompleteStep = () => (
    <div className="mt-8 text-center">
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="text-5xl mb-4 text-green-500">✓</div>
        <h3 className="text-xl font-medium mb-4">Application Submitted Successfully!</h3>
        <p className="mb-6">Thank you for submitting your application. We will review it and get back to you soon.</p>
        
        <Button 
          type="primary" 
          onClick={resetForm}
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
        <Link to={'/'} className="block mb-6">
          <img src={logo} alt="logo" className="w-[250px] object-cover object-center" />
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">TTC Career Test</h1>
        <p className="text-gray-600 mb-6">Join TechTalents City and explore your tech career possibilities</p>
        
        <StepsComponent />
        
        {currentStep === 0 && <ApplicationFormStep />}
        {currentStep === 1 && <VerificationStep />}
        {currentStep === 2 && <CompleteStep />}
        
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>
            By applying, you agree to the <span className="text-primary font-medium">Terms of Service</span> and 
            acknowledge you've read our <span className="text-primary font-medium">Privacy Policy</span>.
          </p>
          <p className="mt-2">
            Only registered members will be granted access to project channels upon acceptance.
          </p>
        </div>
      </Container>
    </div>
  );
};

// Default export
export default TTCCareerForm;

// Test export for testing purposes
export const test = {
  validateEmail: (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  generateMathProblem: () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 + num2;
    return { num1, num2, result };
  },
  FORM_FIELDS: {
    fullName: 'entry.2120631500',
    emailAddress: 'entry.289230066',
    whatDoYouLikeDoing: 'entry.826500830',
    workingFor: 'entry.90149729',
    preferToWork: 'entry.103804273',
    learningComfort: 'entry.126397704',
    techExcitement: 'entry.2046710176',
    techAreas: 'entry.1595563124',
    techActivities: 'entry.608716717',
    personalStrength: 'entry.1388922789',
    motivation: 'entry.1879980715',
    experienceLevel: 'entry.75336198',
    emergingAreas: 'entry.614410637',
    certifications: 'entry.1379512189',
    certificationsList: 'entry.1262447611',
    toolsUsed: 'entry.141495548',
    timeCommitment: 'entry.44204949',
    workImpact: 'entry.2125471600',
    guidanceNeeded: 'entry.1508247044',
    futureGoals: 'entry.686755157'
  }
};
