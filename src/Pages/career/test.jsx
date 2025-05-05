import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Form, Input, Select, Radio, Checkbox, Steps, Divider } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Step } = Steps;
const { Option } = Select;

const CareerTest = () => {
  const [form] = Form.useForm();
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [submissionComplete, setSubmissionComplete] = useState(false);

  // Total number of sections in the form
  const totalSections = 5;

  // Google Form submission URL
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSe1ZJ2I0uhJg1xDywYRgwaYpqBGzwAg-zIZ-Exjey2CORZhvA/formResponse";
  
  // Form field entry IDs from the Google Form
  // These entry IDs are extracted directly from the form HTML
  const FORM_FIELDS = {
    fullName: '2120631500',           // Full Name
    email: '289230066',               // Email Address
    likeDoing: '826500830',           // What do you like doing best?
    workPreference: '90149729',       // Are you more interested in working for
    workStyle: '103804273',           // How do you prefer to work?
    learningComfort: '126397704',     // How comfortable are you with learning new tools
    techExcitement: '2046710176',     // What excites you most about working in tech?
    techInterests: '1595563124',      // Which tech areas are you most curious about
    techActivities: '608716717',      // Which tech-related activities have you enjoyed
    personalStrength: '1388922789',   // What is one personal strength
    techMotivation: '1879980715',     // What is your biggest motivation for pursuing a tech career
    experienceLevel: '75336198',      // Which of these best describes your current experience
    emergingTechOpenness: '614410637', // Are you open to working in emerging areas
    certifications: '1379512189',     // Do you already have any certifications
    certificationsList: '1262447611', // List any certifications that you have
    toolsExperience: '141495548',     // Which of the following tools or platforms
    timeCommitment: '44204949',       // How much time can you realistically commit
    workImpact: '2125471600',         // What type of impact do you want your work to have
    guidanceNeeded: '1508247044',     // What kind of guidance do you need most
    techJourneyGoal: '686755157'      // In the next 12 months, where would you like to be
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Create form data for submission
      const formData = new FormData();
      
      // Add form fields to formData with the correct entry IDs
      Object.keys(FORM_FIELDS).forEach(key => {
        if (values[key]) {
          // Convert array values to comma-separated strings
          const value = Array.isArray(values[key]) ? values[key].join(', ') : values[key];
          formData.append(`entry.${FORM_FIELDS[key]}`, value?.toString() || '');
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
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle moving to the next section
  const handleNext = async () => {
    try {
      // Validate the current section fields
      await form.validateFields();
      
      // Save current section values
      const currentValues = form.getFieldsValue();
      setFormValues({ ...formValues, ...currentValues });
      
      // Move to next section
      if (currentSection < totalSections - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo(0, 0);
      } else {
        // If it's the last section, submit the form
        handleSubmit({ ...formValues, ...currentValues });
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle moving to the previous section
  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  // Restart the form
  const handleRestart = () => {
    form.resetFields();
    setFormValues({});
    setCurrentSection(0);
    setSubmissionComplete(false);
  };

  // Section 1: Basic Information
  const BasicInfoSection = () => (
    <div className="mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">TTC Career Test</h2>
        <p className="text-gray-700">
          Please complete this form to help us learn more about you and support you in discovering and navigating your career path in tech.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
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
            { required: true, message: 'Please enter your email address' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter your email address" className="p-2" />
        </Form.Item>
      </div>
    </div>
  );

  // Section 2: Self-Discovery
  const SelfDiscoverySection = () => (
    <div className="mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">Self-Discovery</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="What do you like doing best?" 
          name="likeDoing" 
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <TextArea rows={4} placeholder="Enter your answer" />
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="Are you more interested in working for:" 
          name="workPreference"
          rules={[{ required: true, message: 'Please select at least one option' }]}
        >
          <Checkbox.Group>
            <div className="flex flex-col gap-3">
              <Checkbox value="Startups">Startups</Checkbox>
              <Checkbox value="Big tech companies">Big tech companies</Checkbox>
              <Checkbox value="Nonprofits">Nonprofits</Checkbox>
              <Checkbox value="Building your own company">Building your own company</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form.Item 
          label="How do you prefer to work?" 
          name="workStyle"
          rules={[{ required: true, message: 'Please select at least one option' }]}
        >
          <Checkbox.Group>
            <div className="flex flex-col gap-3">
              <Checkbox value="Solo, independent projects">Solo, independent projects</Checkbox>
              <Checkbox value="Collaborating with teams">Collaborating with teams</Checkbox>
              <Checkbox value="Leading others and managing vision">Leading others and managing vision</Checkbox>
              <Checkbox value="I'm flexible">I'm flexible</Checkbox>
              <Checkbox value="Other">Other...</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>
      </div>
    </div>
  );

  // Section 3: Career Interests
  const CareerInterestsSection = () => (
    <div className="mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">Career Interests</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="How comfortable are you with learning new tools or programming languages?" 
          name="learningComfort"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <div className="flex flex-col gap-3">
              <Radio value="Very comfortable">Very comfortable (I pick things up quickly)</Radio>
              <Radio value="Somewhat comfortable">Somewhat comfortable (I may need extra time)</Radio>
              <Radio value="Not comfortable">Not comfortable (I need lots of support)</Radio>
            </div>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="What excites you most about working in tech?" 
          name="techExcitement"
          rules={[{ required: true, message: 'Please select at least one option' }]}
        >
          <Checkbox.Group>
            <div className="flex flex-col gap-3">
              <Checkbox value="Solving problems">Solving problems</Checkbox>
              <Checkbox value="Building apps">Building apps</Checkbox>
              <Checkbox value="Data & insights">Data & insights</Checkbox>
              <Checkbox value="Security & systems">Security & systems</Checkbox>
              <Checkbox value="Impact & innovation">Impact & innovation</Checkbox>
              <Checkbox value="Other">Other...</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form.Item 
          label="Which tech areas are you most curious about or interested in learning?" 
          name="techInterests"
          rules={[{ required: true, message: 'Please select at least one option' }]}
        >
          <Checkbox.Group>
            <div className="flex flex-col gap-3">
              <Checkbox value="Software Development">Software Development</Checkbox>
              <Checkbox value="Cybersecurity">Cybersecurity</Checkbox>
              <Checkbox value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</Checkbox>
              <Checkbox value="Blockchain & Web3">Blockchain & Web3</Checkbox>
              <Checkbox value="Product Management">Product Management</Checkbox>
              <Checkbox value="UX/UI Design">UX/UI Design</Checkbox>
              <Checkbox value="Data Analysis & Engineering">Data Analysis & Engineering</Checkbox>
              <Checkbox value="Other">Other...</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>
      </div>
    </div>
  );

  // Section 4: Skill Assessment
  const SkillAssessmentSection = () => (
    <div className="mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">Skill Assessment</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="Which of these best describes your current experience level in tech?" 
          name="experienceLevel"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <div className="flex flex-col gap-3">
              <Radio value="Beginner">Beginner (just exploring)</Radio>
              <Radio value="Intermediate">Intermediate (some hands-on experience)</Radio>
              <Radio value="Advanced">Advanced (I've built or deployed tech projects)</Radio>
            </div>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="Are you open to working in emerging areas like AI, Blockchain, or Cybersecurity if given the right support?" 
          name="emergingTechOpenness"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <div className="flex flex-col gap-3">
              <Radio value="Yes, definitely">Yes, definitely</Radio>
              <Radio value="Maybe, if I understand it more">Maybe, if I understand it more</Radio>
              <Radio value="No, I prefer traditional tech roles for now">No, I prefer traditional tech roles for now</Radio>
            </div>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="Do you already have any certifications or completed courses?" 
          name="certifications"
          rules={[{ required: true, message: 'Please select at least one option' }]}
        >
          <Checkbox.Group>
            <div className="flex flex-col gap-3">
              <Checkbox value="Yes">Yes</Checkbox>
              <Checkbox value="No, I'm starting fresh">No, I'm starting fresh</Checkbox>
              <Checkbox value="Other">Other...</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="List Any Certifications that you have" 
          name="certificationsList"
        >
          <TextArea 
            placeholder="Put 'N/A' if you don't have any."
            rows={4} 
          />
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form.Item 
          label="Which of the following tools or platforms have you used before?" 
          name="toolsExperience"
          rules={[{ required: true, message: 'Please select at least one option' }]}
        >
          <Checkbox.Group>
            <div className="flex flex-col gap-3">
              <Checkbox value="GitHub">GitHub</Checkbox>
              <Checkbox value="Figma">Figma</Checkbox>
              <Checkbox value="Python">Python</Checkbox>
              <Checkbox value="JavaScript">JavaScript</Checkbox>
              <Checkbox value="Google Cloud">Google Cloud</Checkbox>
              <Checkbox value="Other">Other...</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>
      </div>
    </div>
  );

  // Section 5: Goal Setting
  const GoalSettingSection = () => (
    <div className="mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">Goal Setting</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="How much time can you realistically commit to learning or working on a project each week?" 
          name="timeCommitment"
          rules={[{ required: true, message: 'Please select at least one option' }]}
        >
          <Checkbox.Group>
            <div className="flex flex-col gap-3">
              <Checkbox value="Land my first tech internship/job">Land my first tech internship/job</Checkbox>
              <Checkbox value="Transition into a new tech role">Transition into a new tech role</Checkbox>
              <Checkbox value="Build a portfolio for job applications">Build a portfolio for job applications</Checkbox>
              <Checkbox value="Launch a startup or personal project">Launch a startup or personal project</Checkbox>
              <Checkbox value="Build solutions for businesses">Build solutions for businesses</Checkbox>
              <Checkbox value="Innovate in science/health">Innovate in science/health</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="What type of impact do you want your work to have?" 
          name="workImpact"
          rules={[{ required: true, message: 'Please select at least one option' }]}
        >
          <Checkbox.Group>
            <div className="flex flex-col gap-3">
              <Checkbox value="Empower communities">Empower communities</Checkbox>
              <Checkbox value="Build solutions for businesses">Build solutions for businesses</Checkbox>
              <Checkbox value="Innovate in science/health">Innovate in science/health</Checkbox>
              <Checkbox value="Support education">Support education</Checkbox>
              <Checkbox value="Improve financial systems">Improve financial systems</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item 
          label="What kind of guidance do you need most right now?" 
          name="guidanceNeeded"
          rules={[{ required: true, message: 'Please select at least one option' }]}
        >
          <Checkbox.Group>
            <div className="flex flex-col gap-3">
              <Checkbox value="Skill development roadmap">Skill development roadmap</Checkbox>
              <Checkbox value="Project matching">Project matching</Checkbox>
              <Checkbox value="Career mentorship">Career mentorship</Checkbox>
              <Checkbox value="Resume/portfolio help">Resume/portfolio help</Checkbox>
              <Checkbox value="All of the above">All of the above</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form.Item 
          label="In the next 12 months, where would you like to be in your tech journey?" 
          name="techJourneyGoal"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <div className="flex flex-col gap-3">
              <Radio value="Starting my first project">Starting my first project</Radio>
              <Radio value="Landing an internship or job">Landing an internship or job</Radio>
              <Radio value="Building a portfolio">Building a portfolio</Radio>
              <Radio value="Leading a tech team">Leading a tech team</Radio>
            </div>
          </Radio.Group>
        </Form.Item>
      </div>
    </div>
  );

  // Success Screen
  const SuccessScreen = () => (
    <div className="text-center py-8">
      <div className="bg-green-50 p-8 rounded-lg">
        <div className="text-6xl mb-4 text-green-500">✓</div>
        <h2 className="text-2xl font-bold mb-4">Thank You for Completing the Career Test!</h2>
        <p className="text-lg mb-6">
          We've received your responses and will use them to help guide you on your tech journey.
          Our team will review your answers and reach out with personalized recommendations.
        </p>
        <Button 
          type="primary" 
          size="large"
          onClick={handleRestart}
        >
          Take the Test Again
        </Button>
      </div>
    </div>
  );

  // Render the appropriate section based on currentSection
  const renderSection = () => {
    if (submissionComplete) {
      return <SuccessScreen />;
    }

    switch (currentSection) {
      case 0:
        return <BasicInfoSection />;
      case 1:
        return <SelfDiscoverySection />;
      case 2:
        return <CareerInterestsSection />;
      case 3:
        return <SkillAssessmentSection />;
      case 4:
        return <GoalSettingSection />;
      default:
        return <BasicInfoSection />;
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-50 py-8">
      <Container className="w-full max-w-4xl px-4 md:px-8">
        <Link to={'/'} className="block mb-6">
          <img src={logo} alt="logo" className="w-[250px] object-cover object-center" />
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">Career Test</h1>
        <p className="text-gray-600 mb-6">
          Please complete this form to help us learn more about you and support you in discovering and navigating your career path in tech.
        </p>
        
        {/* Progress Indicator */}
        <Steps
          current={currentSection}
          className="mb-8"
          items={[
            {
              title: 'Basic Info',
            },
            {
              title: 'Self-Discovery',
            },
            {
              title: 'Career Interests',
            },
            {
              title: 'Skill Assessment',
            },
            {
              title: 'Goal Setting',
            },
          ]}
        />
        
        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          className="mb-8"
          initialValues={formValues}
        >
          {renderSection()}
          
          {/* Navigation Buttons */}
          {!submissionComplete && (
            <div className="flex justify-between mt-8">
              <Button 
                onClick={handlePrevious}
                disabled={currentSection === 0}
                size="large"
              >
                Previous
              </Button>
              <Button 
                type="primary"
                onClick={handleNext}
                loading={loading}
                size="large"
              >
                {currentSection === totalSections - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          )}
        </Form>
        
      </Container>
    </div>
  );
};

export default CareerTest;
