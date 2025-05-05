import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Form, Input, Select, Radio, Checkbox, Steps } from 'antd';

const { TextArea } = Input;
const { Step } = Steps;
const { Option } = Select;

const Test = () => {
  const [form] = Form.useForm();
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const totalSections = 5;

  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSe1ZJ2I0uhJg1xDywYRgwaYpqBGzwAg-zIZ-Exjey2CORZhvA/formResponse";

  const FORM_FIELDS = {
    fullName: '2120631500',
    email: '289230066',
    likeDoing: '826500830',
    workPreference: '90149729',
    workStyle: '103804273',
    learningComfort: '126397704',
    techExcitement: '2046710176',
    techInterests: '1595563124',
    techActivities: '608716717',
    personalStrength: '1388922789',
    techMotivation: '1879980715',
    experienceLevel: '75336198',
    emergingTechOpenness: '614410637',
    certifications: '1379512189',
    certificationsList: '1262447611',
    toolsExperience: '141495548',
    timeCommitment: '44204949',
    workImpact: '2125471600',
    guidanceNeeded: '1508247044',
    techJourneyGoal: '686755157'
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(FORM_FIELDS).forEach(key => {
        if (values[key]) {
          const value = Array.isArray(values[key]) ? values[key].join(', ') : values[key];
          formData.append(`entry.${FORM_FIELDS[key]}`, value?.toString() || '');
        }
      });

      await fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      setSubmissionComplete(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      const currentValues = form.getFieldsValue();
      setFormValues({ ...formValues, ...currentValues });

      if (currentSection < totalSections - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit({ ...formValues, ...currentValues });
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleRestart = () => {
    form.resetFields();
    setFormValues({});
    setCurrentSection(0);
    setSubmissionComplete(false);
  };

  const BasicInfoSection = () => (
    <div className="mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">TTC Career Test</h2>
        <p className="text-gray-700">
          Please complete this form to help us learn more about you and support you in discovering and navigating your career path in tech.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter your full name' }]}>
          <Input placeholder="Enter your full name" className="p-2" />
        </Form.Item>

        <Form.Item label="Email Address" name="email" rules={[
          { required: true, message: 'Please enter your email address' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}>
          <Input placeholder="Enter your email address" className="p-2" />
        </Form.Item>
      </div>
    </div>
  );

  const SelfDiscoverySection = () => (
    <div className="mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">Self-Discovery</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item label="What do you like doing best?" name="likeDoing" rules={[{ required: true, message: 'This field is required' }]}>
          <TextArea rows={4} placeholder="Enter your answer" />
        </Form.Item>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item label="Are you more interested in working for:" name="workPreference" rules={[{ required: true, message: 'Please select at least one option' }]}>
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
        <Form.Item label="How do you prefer to work?" name="workStyle" rules={[{ required: true, message: 'Please select at least one option' }]}>
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

  const CareerInterestsSection = () => (
    <div className="mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">Career Interests</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Form.Item label="How comfortable are you with learning new tools or programming languages?" name="learningComfort" rules={[{ required: true, message: 'This field is required' }]}>
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
        <Form.Item label="What excites you most about working in tech?" name="techExcitement" rules={[{ required: true, message: 'Please select at least one option' }]}>
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
        <Form.Item label="Which tech areas are you most curious about or interested in learning?" name="techInterests" rules={[{ required: true, message: 'Please select at least one option' }]}>
          <Checkbox.Group>
            <div className="flex flex-col gap-3">
              <Checkbox value="Software Development">Software Development</Checkbox>
              <Checkbox value="Cybersecurity">Cybersecurity</Checkbox>
              <Checkbox value="Artificial Intelligence & Machine Learning">AI & Machine Learning</Checkbox>
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

  const SuccessScreen = () => (
    <div className="text-center py-8">
      <div className="bg-green-50 p-8 rounded-lg">
        <div className="text-6xl mb-4 text-green-500">✓</div>
        <h2 className="text-2xl font-bold mb-4">Thank You for Completing the Career Test!</h2>
        <p className="text-lg mb-6">
          We've received your responses and will use them to help guide you on your tech journey.
        </p>
        <Button type="primary" size="large" onClick={handleRestart}>Take the Test Again</Button>
      </div>
    </div>
  );

  const renderSection = () => {
    if (submissionComplete) return <SuccessScreen />;
    switch (currentSection) {
      case 0: return <BasicInfoSection />;
      case 1: return <SelfDiscoverySection />;
      case 2: return <CareerInterestsSection />;
      default: return <BasicInfoSection />;
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-50 py-8">
      <Container className="w-full max-w-4xl px-4 md:px-8">
        <Link to="/" className="block mb-6">
          <img src={logo} alt="logo" className="w-[250px] object-cover object-center" />
        </Link>

        <h1 className="text-3xl font-bold mb-2">Career Test</h1>
        <p className="text-gray-600 mb-6">
          Please complete this form to help us learn more about you and support you in discovering and navigating your career path in tech.
        </p>

        <Steps
          current={currentSection}
          className="mb-8"
          items={[
            { title: 'Basic Info' },
            { title: 'Self-Discovery' },
            { title: 'Career Interests' },
            { title: 'Skill Assessment' },
            { title: 'Goal Setting' },
          ]}
        />

        <Form form={form} layout="vertical" className="mb-8" initialValues={formValues}>
          {renderSection()}

          {!submissionComplete && (
            <div className="flex justify-between mt-8">
              <Button onClick={handlePrevious} disabled={currentSection === 0} size="large">Previous</Button>
              <Button type="primary" onClick={handleNext} loading={loading} size="large">
                {currentSection === totalSections - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default Test;
