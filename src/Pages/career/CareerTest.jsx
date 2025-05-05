import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Form, Input, Select, Steps } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Step } = Steps;

const CareerTest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [submissionComplete, setSubmissionComplete] = useState(false);

  // Google Form submission URL - PLEASE REPLACE WITH THE CORRECT GOOGLE FORMS URL
  const googleFormURL = "https://docs.google.com/forms/d/e/[YOUR_FORM_ID]/formResponse";

  // Form field entry IDs from the Google Form
  const FORM_FIELDS = {
    fullName: 'entry.2120631500',
    emailAddress: 'entry.289230066',
    doingBest: 'entry.826500830',
    interestedWorking: 'entry.90149729',
    preferWork: 'entry.103804273',
    comfortableLearning: 'entry.126397704',
    excitesTech: 'entry.2046710176',
    curiousTechAreas: 'entry.1595563124',
    enjoyedTechActivities: 'entry.608716717',
    personalStrength: 'entry.1388922789',
    motivationPursuing: 'entry.1879980715',
    experienceLevel: 'entry.75336198',
    openEmergingTech: 'entry.614410637',
    existingCertifications: 'entry.1379512189',
    listCertifications: 'entry.1262447611',
    usedToolsPlatforms: 'entry.141495548',
    realisticTimeCommitment: 'entry.44204949',
    impactWorkHave: 'entry.2125471600',
    guidanceNeedNow: 'entry.1508247044',
    next12MonthsTechJourney: 'entry.686755157',
  };

  // Store form values and move to the next step (currently only one step)
  const handleFormValuesSubmit = (values) => {
    setFormValues(values);
    submitFormToGoogle();
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
      setCurrentStep(1); // Move to the success step

      // Clear form after successful submission
      setTimeout(() => {
        form.resetFields();
        setFormValues({});
        setSubmissionComplete(false);
        setCurrentStep(0);
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Career Test Form Step Component
  const CareerTestFormStep = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormValuesSubmit}
      initialValues={formValues}
      className="mt-8"
    >
      <p>
        Welcome to the TechTalents City Career Test — a personalized tool designed to help you explore your potential and clarify your direction in the tech industry. This is more than a typical test. It's an opportunity to reflect on your strengths, interests, and motivations, and to align them with meaningful opportunities in tech. Your answers will help us recommend the best projects, mentors, and learning pathways tailored to your journey.
      </p>

      <Form.Item
        label="Full Name *"
        name="fullName"
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input placeholder="Your full name" className="p-2" />
      </Form.Item>

      <Form.Item
        label="Email Address *"
        name="emailAddress"
        rules={[
          { required: true, message: 'Please enter your email address' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input placeholder="Your email address" className="p-2" />
      </Form.Item>

      <Form.Item
        label="Preferred Work Style *"
        name="doingBest"
        rules={[{ required: true, message: 'Please select your preferred work style' }]}
      >
        <Select placeholder="Select your preferred work style" className="w-full">
          <Select.Option value="working_independently">Working independently on solo projects</Select.Option>
          <Select.Option value="collaborating_team">Collaborating within a team</Select.Option>
          <Select.Option value="leading_others">Leading others and managing the vision</Select.Option>
          <Select.Option value="flexible_adaptable">Being flexible and adaptable across work styles</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Comfort Level with Learning New Tools/Languages *"
        name="comfortableLearning"
        rules={[{ required: true, message: 'Please rate your comfort level' }]}
      >
        <Select placeholder="Select your comfort level" className="w-full">
          <Select.Option value="very_comfortable">Very comfortable – I pick things up quickly</Select.Option>
          <Select.Option value="somewhat_comfortable">Somewhat comfortable – I may need extra time</Select.Option>
          <Select.Option value="not_comfortable">Not comfortable – I need structured support</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="What excites you most about working in tech? *"
        name="excitesTech"
        rules={[{ required: true, message: 'Please select what excites you' }]}
      >
        <Select placeholder="Select what excites you most" className="w-full">
          <Select.Option value="solving_problems">Solving complex problems</Select.Option>
          <Select.Option value="building_platforms">Building applications and platforms</Select.Option>
          <Select.Option value="exploring_data">Exploring data and gaining insights</Select.Option>
          <Select.Option value="ensuring_security">Ensuring system security and reliability</Select.Option>
          <Select.Option value="driving_innovation">Driving real-world innovation and impact</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Preferred Type of Organization *"
        name="interestedWorking"
        rules={[{ required: true, message: 'Please select your preferred organization type' }]}
      >
        <Select placeholder="Select your preferred organization type" className="w-full">
          <Select.Option value="startups">Startups and entrepreneurial ventures</Select.Option>
          <Select.Option value="large_companies">Large tech companies</Select.Option>
          <Select.Option value="nonprofit_organizations">Nonprofit or mission-driven organizations</Select.Option>
          <Select.Option value="government_agencies">Private sector or government agencies</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Tech Areas of Curiosity *"
        name="curiousTechAreas"
        rules={[{ required: true, message: 'Please select the tech areas you are curious about' }]}
      >
        <Select mode="multiple" placeholder="Select tech areas you are curious about" className="w-full">
          <Select.Option value="software_development">Software Development</Select.Option>
          <Select.Option value="cybersecurity">Cybersecurity</Select.Option>
          <Select.Option value="ai_ml">Artificial Intelligence & Machine Learning</Select.Option>
          <Select.Option value="blockchain_web3">Blockchain & Web3</Select.Option>
          <Select.Option value="product_management">Product Management</Select.Option>
          <Select.Option value="ux_ui_design">UX/UI Design</Select.Option>
          <Select.Option value="data_analysis_engineering">Data Analysis & Engineering</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="One Personal Strength *"
        name="personalStrength"
        rules={[{ required: true, message: 'Please describe one personal strength' }]}
      >
        <Input placeholder="e.g., creativity, communication, leadership, perseverance" className="p-2" />
      </Form.Item>

      <Form.Item
        label="Completed Certifications or Courses? *"
        name="existingCertifications"
        rules={[{ required: true, message: 'Please indicate if you have certifications' }]}
      >
        <Select placeholder="Select an option" className="w-full">
          <Select.Option value="yes">Yes</Select.Option>
          <Select.Option value="no">No</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="List Any Certifications or Courses (if applicable)"
        name="listCertifications"
      >
        <TextArea rows={2} placeholder="e.g., CompTIA Security+, AWS Certified, specific online courses" className="p-2" />
      </Form.Item>

      <Form.Item
        label="Tools or Platforms Used *"
        name="usedToolsPlatforms"
        rules={[{ required: true, message: 'Please list the tools or platforms you have used' }]}
      >
        <Select mode="multiple" placeholder="e.g., GitHub, Figma, Python, JavaScript, Google Cloud" className="w-full">
          <Select.Option value="github">GitHub</Select.Option>
          <Select.Option value="figma">Figma</Select.Option>
          <Select.Option value="python">Python</Select.Option>
          <Select.Option value="javascript">JavaScript</Select.Option>
          <Select.Option value="google_cloud">Google Cloud</Select.Option>
          {/* Add more tools/platforms as needed */}
        </Select>
      </Form.Item>

      <Form.Item
        label="Weekly Time Commitment *"
        name="realisticTimeCommitment"
        rules={[{ required: true, message: 'Please estimate your weekly commitment' }]}
      >
        <Input placeholder="e.g., 5-10 hours, 15-20 hours" className="p-2" />
      </Form.Item>

      <Form.Item
        label="Short-Term Goals *"
        name="motivationPursuing"
        rules={[{ required: true, message: 'Please select your short-term goals' }]}
      >
        <Select mode="multiple" placeholder="Select your short-term goals" className="w-full">
          <Select.Option value="first_tech_role">Landing your first tech internship or job</Select.Option>
          <Select.Option value="transition_new_role">Transitioning into a new role</Select.Option>
          <Select.Option value="building_portfolio">Building a portfolio for job applications</Select.Option>
          <Select.Option value="launching_project">Launching a startup or personal project</Select.Option>
          <Select.Option value="creating_solutions">Creating solutions for businesses or communities</Select.Option>
          <Select.Option value="innovating_fields">Innovating in areas like science, health, or finance</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Desired Impact *"
        name="impactWorkHave"
        rules={[{ required: true, message: 'Please select the impact you want to create' }]}
      >
        <Select mode="multiple" placeholder="Select the impact you want to create" className="w-full">
          <Select.Option value="empowering_communities">Empowering underrepresented communities</Select.Option>
          <Select.Option value="building_business_solutions">Building business-focused solutions</Select.Option>
          <Select.Option value="advancing_innovation">Advancing innovation in science or healthcare</Select.Option>
          <Select.Option value="supporting_education">Supporting global education</Select.Option>
          <Select.Option value="improving_financial_systems">Improving financial systems</Select.Option>
          {/* Add more impact areas as needed */}
        </Select>
      </Form.Item>

      <Form.Item
        label="Support Needed Most *"
        name="guidanceNeedNow"
        rules={[{ required: true, message: 'Please select the support you need' }]}
      >
        <Select mode="multiple" placeholder="Select the support you need most" className="w-full">
          <Select.Option value="skill_roadmap">A skill development roadmap</Select.Option>
          <Select.Option value="project_matching">Matching with suitable projects</Select.Option>
          <Select.Option value="career_mentorship">Career mentorship</Select.Option>
          <Select.Option value="resume_portfolio_help">Help with your resume or portfolio</Select.Option>
          <Select.Option value="all_of_the_above">All of the above</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Where would you like to be in your tech journey over the next 12 months? *"
        name="next12MonthsTechJourney"
        rules={[{ required: true, message: 'Please select your 12-month aspiration' }]}
      >
        <Select placeholder="Select your 12-month aspiration" className="w-full">
          <Select.Option value="starting_first_project">Starting your first real-world project</Select.Option>
          <Select.Option value="securing_internship_job">Securing an internship or full-time position</Select.Option>
          <Select.Option value="building_showcasing_portfolio">Building and showcasing a complete portfolio</Select.Option>
          <Select.Option value="leading_technical_initiative">Leading a team or managing a technical initiative</Select.Option>
        </Select>
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        className="w-full"
        loading={loading}
      >
        Submit Career Test
      </Button>
    </Form>
  );

  // Success Step Component
  const SuccessStep = () => (
    <div className="mt-8 text-center">
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="text-5xl mb-4 text-green-500">✓</div>
        <h3 className="text-xl font-medium mb-4">Career Test Submitted Successfully!</h3>
        <p className="mb-6">Thank you for completing the career test. We will review your responses.</p>

        <Button
          type="primary"
          onClick={() => {
            setCurrentStep(0);
            setSubmissionComplete(false);
          }}
        >
          Return to Career Test
        </Button>
      </div>
    </div>
  );

  return (
    <Container>
      <div className="py-10">
        <div className="flex items-center justify-center mb-6">
          <Link to="/">
            <img src={logo} alt="TechTalents City Logo" className="h-12" />
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Career Test</h1>
          <p className="text-gray-600 text-center mb-6">
            Discover your tech strengths and find your perfect career path
          </p>

          <Steps current={currentStep} className="mb-8">
            <Step title="Career Test" />
            <Step title="Complete" />
          </Steps>

          {currentStep === 0 && <CareerTestFormStep />}
          {currentStep === 1 && <SuccessStep />}
        </div>
      </div>
    </Container>
  );
};

export default CareerTest;
