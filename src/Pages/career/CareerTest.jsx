import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Form, Input, Select, Steps, Collapse } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Step } = Steps;
const { Panel } = Collapse;
const { Option } = Select;

const CareerTest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitComplete, setSubmitComplete] = useState(false);

  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLScIbS6ykk3RY8bXUJRg52oikbt8mcvu8eOdj2x3w9xTeFeKmg/formResponse";

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

  const handleFormSubmit = (values) => {
    setLoading(true);

    const formData = new FormData();

    Object.keys(FORM_FIELDS).forEach((key) => {
      const value = values[key];
      if (value !== undefined && value !== null) {
        const stringValue = Array.isArray(value) ? value.join(', ') : value.toString();
        formData.append(FORM_FIELDS[key], stringValue);
      }
    });

    fetch(googleFormURL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })
      .then(() => {
        setLoading(false);
        setSubmitComplete(true);
        setCurrentStep(1);
        form.resetFields();
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert('Submission failed. Please try again.');
        setLoading(false);
      });
  };

  const FormGuide = () => (
    <Collapse ghost className="mb-8">
      <Panel header={<span className="text-lg font-semibold text-primary">🧭 Click here to view Career Test Guide</span>} key="guide">
        <div className="bg-gray-50 p-6 rounded-lg text-base leading-relaxed text-gray-700">
          {/* All instructional sections remain unchanged for clarity */}
          {/* If needed, you can add a collapsible panel or accordion UI later */}
          <p>Use the career test to reflect on your goals, work preferences, and interests. This helps us tailor recommendations and match you with the right opportunities.</p>
        </div>
      </Panel>
    </Collapse>
  );

  const CareerTestForm = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="mt-6"
    >
      <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
        <Input placeholder="Enter your full name" />
      </Form.Item>

      <Form.Item label="Email Address" name="email" rules={[
        { required: true },
        { type: 'email', message: 'Enter a valid email' }
      ]}>
        <Input placeholder="Enter your email address" />
      </Form.Item>

      <Form.Item label="What do you like doing best?" name="whatYouLikeDoing" rules={[{ required: true }]}>
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Are you more interested in working for:" name="workingForInterest" rules={[{ required: true }]}>
        <Select placeholder="Choose an option">
          <Option value="startups">Startups</Option>
          <Option value="enterprises">Enterprise companies</Option>
          <Option value="freelance">Freelance</Option>
          <Option value="nonprofit">Non-profits</Option>
          <Option value="own_business">Start my own business</Option>
        </Select>
      </Form.Item>

      <Form.Item label="How do you prefer to work?" name="workPreference" rules={[{ required: true }]}>
        <Select placeholder="Choose an option">
          <Option value="remote">Fully remote</Option>
          <Option value="hybrid">Hybrid</Option>
          <Option value="office">In-office</Option>
          <Option value="flexible">Flexible</Option>
        </Select>
      </Form.Item>

      <Form.Item label="How comfortable are you with learning new tools?" name="learningComfort" rules={[{ required: true }]}>
        <Select placeholder="Choose an option">
          <Option value="very_comfortable">Very comfortable</Option>
          <Option value="comfortable">Comfortable</Option>
          <Option value="neutral">Neutral</Option>
          <Option value="uncomfortable">Somewhat uncomfortable</Option>
        </Select>
      </Form.Item>

      <Form.Item label="What excites you most about working in tech?" name="techExcitement" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Which tech areas interest you?" name="techAreasInterest" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Which tech activities have you enjoyed?" name="techActivities" rules={[{ required: true }]}>
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="One strength to help you succeed in tech?" name="personalStrength" rules={[{ required: true }]}>
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Your biggest motivation for tech?" name="motivation" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Experience Level" name="experienceLevel" rules={[{ required: true }]}>
        <Select placeholder="Choose experience level">
          <Option value="no_experience">No experience</Option>
          <Option value="beginner">Beginner</Option>
          <Option value="intermediate">Intermediate</Option>
          <Option value="advanced">Advanced</Option>
          <Option value="professional">Professional</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Open to emerging tech like AI, Blockchain?" name="emergingTech" rules={[{ required: true }]}>
        <Select>
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
          <Option value="maybe">Maybe</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Do you have any certifications?" name="certifications" rules={[{ required: true }]}>
        <Select>
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>
      </Form.Item>

      <Form.Item label="List any certifications you have" name="certificationsList" rules={[{ required: true }]}>
        <TextArea placeholder="Type 'None' if you don't have any" rows={3} />
      </Form.Item>

      <Form.Item label="Tools or platforms you've used" name="toolsUsed" rules={[{ required: true }]}>
        <Select mode="multiple" placeholder="Choose tools" allowClear>
          <Option value="git">Git/GitHub</Option>
          <Option value="vscode">VS Code</Option>
          <Option value="terminal">Terminal</Option>
          <Option value="figma">Figma</Option>
          <Option value="aws">AWS</Option>
          <Option value="docker">Docker</Option>
          <Option value="databases">Databases</Option>
          <Option value="none">None</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Time commitment per week" name="timeCommitment" rules={[{ required: true }]}>
        <Select>
          <Option value="1-5">1–5 hrs</Option>
          <Option value="6-10">6–10 hrs</Option>
          <Option value="11-20">11–20 hrs</Option>
          <Option value="20+">20+ hrs</Option>
        </Select>
      </Form.Item>

      <Form.Item label="What type of impact do you want to make?" name="desiredImpact" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="What kind of support do you need now?" name="guidanceNeeded" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Where do you want to be in 12 months?" name="techJourneyGoal" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Submit Career Test
        </Button>
      </Form.Item>
    </Form>
  );

  const SuccessStep = () => (
    <div className="mt-8 text-center">
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="text-5xl mb-4 text-green-500">✓</div>
        <h3 className="text-xl font-medium mb-4">Career Test Submitted Successfully!</h3>
        <p className="mb-6">We'll review your answers and share personalized guidance soon.</p>
        <Button type="primary" onClick={() => window.location.href = '/'} block>
          Return to Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-white py-8">
      <Container className="w-full max-w-4xl px-4 md:px-8">
        <Link to={'/'} className="block mb-6">
          <img src={logo} alt="logo" className="w-[250px]" />
        </Link>

        <h1 className="text-3xl font-bold mb-2">Career Path in Tech</h1>
        <p className="text-gray-600 mb-6">Help us understand your interests and experience.</p>

        <FormGuide />

        <Steps current={currentStep} className="mb-8">
          <Step title="Career Test" />
          <Step title="Complete" />
        </Steps>

        {currentStep === 0 && <CareerTestForm />}
        {currentStep === 1 && <SuccessStep />}
      </Container>
    </div>
  );
};

export default CareerTest;
