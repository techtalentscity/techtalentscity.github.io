import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
// Removed logo import
import { Button, Form, Input, Select, Steps, Collapse } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Step } = Steps;
const { Panel } = Collapse;
const { Option } = Select;

const CareerTest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, result: 0 });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submitComplete, setSubmitComplete] = useState(false);

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

  // Google Form submission URL for the provided Spreadsheet ID: 15Y0h2UiVH1RhdFz5HtDAT3HiXGBjw-4Gpmv0KrFlAAM
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLScIbS6ykk3RY8bXUJRg52oikbt8mcvu8eOdj2x3w9xTeFeKmg/formResponse";
  
  // Form field entry IDs extracted from the actual Google Form
  const FORM_FIELDS = {
    fullName: 'entry.2120631500',
    email: 'entry.289230066',
    whatYouLikeDoing: 'entry.826500830',
    workingForInterest: 'entry.90149729',
    workPreference: 'entry.103804273',
    learningComfort: 'entry.126397704',
    techExcitement: 'entry.2046710176',
    techAreasInterest: 'entry.1595563124',
    techActivities: 'entry.608716717',
    personalStrength: 'entry.1388922789',
    motivation: 'entry.1879980715',
    experienceLevel: 'entry.75336198',
    emergingTech: 'entry.614410637',
    certifications: 'entry.1379512189',
    certificationsList: 'entry.1262447611',
    toolsUsed: 'entry.141495548',
    timeCommitment: 'entry.44204949',
    desiredImpact: 'entry.2125471600',
    guidanceNeeded: 'entry.1508247044',
    techJourneyGoal: 'entry.686755157'
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
  const submitFormToGoogle = () => {
    if (!formValues) return;
    
    setLoading(true);
    
    // Create a hidden form element for direct submission
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = googleFormURL;
    
    // Create hidden iframe as target
    const iframe = document.createElement('iframe');
    const iframeName = 'hidden-form-iframe';
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    form.target = iframeName;
    form.style.display = 'none';
    
    // Add form fields
    Object.keys(FORM_FIELDS).forEach(key => {
      if (formValues[key] !== undefined && formValues[key] !== null) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = FORM_FIELDS[key];
        
        // Handle array values (like multi-select fields)
        if (Array.isArray(formValues[key])) {
          input.value = formValues[key].join(', ');
        } else {
          input.value = formValues[key].toString();
        }
        
        form.appendChild(input);
        console.log(`Submitting field ${FORM_FIELDS[key]}: ${input.value}`);
      }
    });
    
    // Add form to the body
    document.body.appendChild(form);
    
    // Set up iframe load handler to detect completion
    iframe.onload = () => {
      console.log('Form submitted successfully');
      
      // Clean up elements
      document.body.removeChild(form);
      document.body.removeChild(iframe);
      
      // Update UI
      setLoading(false);
      setSubmitComplete(true);
      setCurrentStep(2);
    };
    
    // Handle potential errors
    iframe.onerror = () => {
      console.error('Error submitting form via iframe');
      
      // Clean up elements
      document.body.removeChild(form);
      document.body.removeChild(iframe);
      
      // Fallback to the fetch method as a backup
      submitViaFetchFallback();
    };
    
    // Submit the form
    form.submit();
  };

  // Fallback submission method using fetch
  const submitViaFetchFallback = () => {
    console.log('Trying fallback submission method');
    
    // Create form data
    const formData = new FormData();
    
    // Add fields to form data
    Object.keys(FORM_FIELDS).forEach(key => {
      if (formValues[key] !== undefined && formValues[key] !== null) {
        let valueToSubmit;
        if (Array.isArray(formValues[key])) {
          valueToSubmit = formValues[key].join(', ');
        } else {
          valueToSubmit = formValues[key].toString();
        }
        
        formData.append(FORM_FIELDS[key], valueToSubmit);
      }
    });
    
    // Submit via fetch
    fetch(googleFormURL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    .then(() => {
      console.log('Form submitted via fetch');
      setLoading(false);
      setSubmitComplete(true);
      setCurrentStep(2);
    })
    .catch(error => {
      console.error('Error submitting form via fetch:', error);
      alert('There was an error submitting your form. Please try again or contact support.');
      setLoading(false);
    });
  };

  // Form Guide Component
  const FormGuide = () => (
    <div className="mb-8">
      <Collapse ghost>
        <Panel header={<span className="text-lg font-semibold text-primary">🧭 Click here to view Career Test Guide</span>} key="guide">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Career Test Guide</h2>
            
            <div className="mb-4">
              <p className="mb-3">
                Welcome to the <strong>Career Test</strong> — a personalized tool designed to help you explore your potential and clarify your direction in the tech industry. This is more than a typical test. It's an opportunity to reflect on your strengths, interests, and motivations, and to align them with meaningful opportunities in tech. Your answers will help us recommend the best projects, mentors, and learning pathways tailored to your journey.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Preferred Work Style</h4>
              <p className="mb-3">
                We start by exploring your <strong>preferred work style</strong>. Some people work best independently, others thrive in collaborative teams or aspire to lead initiatives. Understanding your preference helps us align you with the right environment. You'll choose from:
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li>Working independently on solo projects</li>
                <li>Collaborating within a team</li>
                <li>Leading others and managing the vision</li>
                <li>Being flexible and adaptable across work styles</li>
              </ul>
            </div>
            
            {/* Rest of the guide content remains the same */}
            
          </div>
        </Panel>
      </Collapse>
    </div>
  );

  // Career Test Form Step Component
  const CareerTestFormStep = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormValuesSubmit}
      initialValues={formValues}
      className="mt-6"
    >
      {/* Personal Information */}
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input placeholder="Enter your full name" className="p-2" />
      </Form.Item>

      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input placeholder="Enter your email address" className="p-2" />
      </Form.Item>

      {/* Tech Interests & Experience */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Tech Interests & Experience</h2>
      
      <Form.Item
        label="What do you like doing best?"
        name="whatYouLikeDoing"
        rules={[{ required: true, message: 'Please answer this question' }]}
      >
        <TextArea placeholder="Enter your answer" rows={4} className="p-2" />
      </Form.Item>

      <Form.Item
        label="Are you more interested in working for:"
        name="workingForInterest"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <Select placeholder="Select an option">
          <Option value="startups">Startups</Option>
          <Option value="enterprises">Enterprise companies</Option>
          <Option value="freelance">Freelance/independent work</Option>
          <Option value="nonprofit">Non-profit organizations</Option>
          <Option value="own_business">Starting my own business</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="How do you prefer to work?"
        name="workPreference"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <Select placeholder="Select an option">
          <Option value="remote">Fully remote</Option>
          <Option value="hybrid">Hybrid (mix of remote and in-office)</Option>
          <Option value="office">In-office</Option>
          <Option value="flexible">Flexible/depends on the project</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="How comfortable are you with learning new tools or programming languages?"
        name="learningComfort"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <Select placeholder="Select an option">
          <Option value="very_comfortable">Very comfortable</Option>
          <Option value="comfortable">Comfortable</Option>
          <Option value="neutral">Neutral</Option>
          <Option value="uncomfortable">Somewhat uncomfortable</Option>
          <Option value="very_uncomfortable">Very uncomfortable</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="What excites you most about working in tech?"
        name="techExcitement"
        rules={[{ required: true, message: 'Please answer this question' }]}
      >
        <Input placeholder="Enter your answer" className="p-2" />
      </Form.Item>

      <Form.Item
        label="Which tech areas are you most curious about or interested in learning?"
        name="techAreasInterest"
        rules={[{ required: true, message: 'Please answer this question' }]}
      >
        <Input placeholder="Enter your answer" className="p-2" />
      </Form.Item>

      <Form.Item
        label="Which tech-related activities have you enjoyed the most so far?"
        name="techActivities"
        help="(even if it's informal — e.g., tinkering with websites, playing with data, cybersecurity games, etc.)"
        rules={[{ required: true, message: 'Please answer this question' }]}
      >
        <TextArea placeholder="Enter your answer" rows={4} className="p-2" />
      </Form.Item>

      <Form.Item
        label="What is one personal strength you believe will help you succeed in tech?"
        name="personalStrength"
        rules={[{ required: true, message: 'Please answer this question' }]}
      >
        <TextArea placeholder="Enter your answer" rows={4} className="p-2" />
      </Form.Item>

      <Form.Item
        label="What is your biggest motivation for pursuing a tech career?"
        name="motivation"
        rules={[{ required: true, message: 'Please answer this question' }]}
      >
        <Input placeholder="Enter your answer" className="p-2" />
      </Form.Item>

      {/* Experience & Skills */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Experience & Skills</h2>
      
      <Form.Item
        label="Which of these best describes your current experience level in tech?"
        name="experienceLevel"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <Select placeholder="Select an option">
          <Option value="no_experience">No experience yet</Option>
          <Option value="beginner">Beginner (some self-learning)</Option>
          <Option value="intermediate">Intermediate (completed courses/small projects)</Option>
          <Option value="advanced">Advanced (worked on larger projects/some professional experience)</Option>
          <Option value="professional">Professional (currently working in tech)</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Are you open to working in emerging areas like AI, Blockchain, or Cybersecurity if given the right support?"
        name="emergingTech"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <Select placeholder="Select an option">
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
          <Option value="maybe">Maybe</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Do you already have any certifications or completed courses?"
        name="certifications"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <Select placeholder="Select an option">
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="List Any Certifications that you have"
        name="certificationsList"
        rules={[{ required: true, message: 'Please answer this question' }]}
      >
        <TextArea placeholder="Enter your answer (or type 'None' if you don't have any)" rows={4} className="p-2" />
      </Form.Item>

      <Form.Item
        label="Which of the following tools or platforms have you used before?"
        name="toolsUsed"
        rules={[{ required: true, message: 'Please select at least one option' }]}
      >
        <Select
          mode="multiple"
          placeholder="Select options"
          allowClear
        >
          <Option value="git">Git/GitHub</Option>
          <Option value="vscode">VS Code</Option>
          <Option value="terminal">Command Line/Terminal</Option>
          <Option value="figma">Figma/Design Tools</Option>
          <Option value="aws">AWS/Cloud Platforms</Option>
          <Option value="docker">Docker/Containers</Option>
          <Option value="databases">Databases</Option>
          <Option value="none">None of these</Option>
        </Select>
      </Form.Item>

      {/* Commitment & Goals */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Commitment & Goals</h2>

      <Form.Item
        label="How much time can you realistically commit to learning or working on a project each week?"
        name="timeCommitment"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <Select placeholder="Select an option">
          <Option value="1-5">1-5 hours</Option>
          <Option value="6-10">6-10 hours</Option>
          <Option value="11-20">11-20 hours</Option>
          <Option value="20+">More than 20 hours</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="What type of impact do you want your work to have?"
        name="desiredImpact"
        rules={[{ required: true, message: 'Please answer this question' }]}
      >
        <Input placeholder="Enter your answer" className="p-2" />
      </Form.Item>

      <Form.Item
        label="What kind of guidance do you need most right now?"
        name="guidanceNeeded"
        rules={[{ required: true, message: 'Please answer this question' }]}
      >
        <Input placeholder="Enter your answer" className="p-2" />
      </Form.Item>

      <Form.Item
        label="In the next 12 months, where would you like to be in your tech journey?"
        name="techJourneyGoal"
        rules={[{ required: true, message: 'Please answer this question' }]}
      >
        <Input placeholder="Enter your answer" className="p-2" />
      </Form.Item>

      <p className='pb-6 text-sm'>
        By continuing, you agree to the <span className='text-primary font-medium'>Terms of Service</span> and 
        acknowledge you&apos;ve read our <span className='text-primary font-medium'>Privacy Policy</span>.
      </p>

      <Button 
        type="primary" 
        htmlType="submit" 
        className="w-full"
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
        <p className="mb-6">Please solve this math problem to submit your career test:</p>
        
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
        <h3 className="text-xl font-medium mb-4">Career Test Submitted Successfully!</h3>
        <p className="mb-6">Thank you for completing the Career Test. We'll review your responses and get back to you soon with personalized recommendations for your tech journey.</p>
        
        <Button 
          type="primary" 
          onClick={() => {
            window.location.href = '/';
          }}
          block
        >
          Return to Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-white py-8">
      <Container className="w-full max-w-4xl px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-2">Career Path in Tech</h1>
        <p className="text-gray-600 mb-6">Help us understand your tech interests and experience</p>
        
        {/* Form Guide Section */}
        <FormGuide />
        
        <Steps
          current={currentStep}
          className="mb-8"
          items={[
            {
              title: 'Career Test',
            },
            {
              title: 'Verification',
            },
            {
              title: 'Complete',
            },
          ]}
        />
        
        {currentStep === 0 && <CareerTestFormStep />}
        {currentStep === 1 && <CaptchaStep />}
        {currentStep === 2 && <SuccessStep />}
      </Container>
    </div>
  );
};

export default CareerTest;
