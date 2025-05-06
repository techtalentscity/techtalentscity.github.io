import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import { Button, Form, Input, Radio, Rate, Steps } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Step } = Steps;

const Support = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Google Form submission URL
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfzm2aOPtXdLd5ZpCN0-A0Gadrw1L0e_nK3QvyhZ6-AliBoyw/formResponse";
  
  // Form field entry IDs from the Google Form - updated with verified IDs
  const FORM_FIELDS = {
    firstName: 'entry.2120631500',
    lastName: 'entry.976572827',
    email: 'entry.1556369182',
    rating: 'entry.162050771',
    feedback: 'entry.1343188993', 
    suggestions: 'entry.2083196363'
  };

  // Store form values and submit directly
  const handleFormValuesSubmit = async (values) => {
    setFormValues(values);
    await submitFormToGoogle(values);
  };

  // Submit form to Google Form using the improved method
  const submitFormToGoogle = async (values) => {
    if (!values) return;
    
    try {
      setLoading(true);
      setSubmissionError(null);
      
      // Create form data for submission
      const formData = new FormData();
      
      // Add fields to form data - only add fields that exist in the FORM_FIELDS object
      Object.keys(FORM_FIELDS).forEach(key => {
        if (values[key] !== undefined && values[key] !== null) {
          let valueToSubmit;
          
          // Handle array values (like multi-select fields)
          if (Array.isArray(values[key])) {
            valueToSubmit = values[key].join(', ');
          } else {
            valueToSubmit = values[key].toString();
          }
          
          formData.append(FORM_FIELDS[key], valueToSubmit);
          console.log(`Adding field ${FORM_FIELDS[key]}: ${valueToSubmit}`);
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
      setCurrentStep(1);
      
      // Clear form after successful submission
      setTimeout(() => {
        form.resetFields();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionError('There was an error submitting your feedback. Please try again or contact our team directly.');
    } finally {
      setLoading(false);
    }
  };

  // Feedback Form Step Component
  const FeedbackFormStep = () => (
    <Form 
      form={form}
      layout="vertical"
      onFinish={handleFormValuesSubmit}
      initialValues={formValues}
      className="mt-6"
    >
      {/* Personal Information */}
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item 
          label="First Name" 
          name="firstName" 
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input placeholder="Enter your first name" className="p-2" />
        </Form.Item>
        
        <Form.Item 
          label="Last Name" 
          name="lastName" 
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input placeholder="Enter your last name" className="p-2" />
        </Form.Item>
      </div>
      
      <Form.Item 
        label="Email" 
        name="email" 
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input placeholder="Enter your email address" className="p-2" />
      </Form.Item>
      
      {/* Feedback Information */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Your Feedback</h2>
      
      <Form.Item 
        label="How would you rate your experience on our platform on a scale of 1 to 5, with 5 being excellent and 1 being poor?" 
        name="rating" 
        rules={[{ required: true, message: 'Please rate your experience' }]}
      >
        <Rate allowHalf />
      </Form.Item>
      
      <Form.Item 
        label="We'd love your feedback! Share your complaints, concerns, case reports, or observations — whether positive or negative." 
        name="feedback" 
        rules={[{ required: true, message: 'Please provide some feedback' }]}
      >
        <TextArea 
          placeholder="Share your experience with our platform..." 
          rows={4} 
          className="p-2"
        />
      </Form.Item>
      
      <Form.Item 
        label="Share any improvement suggestions you have" 
        name="suggestions" 
        rules={[{ required: true, message: 'Please share your suggestions' }]}
      >
        <TextArea 
          placeholder="Your ideas for improvement..." 
          rows={4} 
          className="p-2"
        />
      </Form.Item>
      
      {/* Display submission error if any */}
      {submissionError && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
          {submissionError}
        </div>
      )}

      <p className='pb-6 text-sm'>
        By submitting, you agree to the <span className='text-primary font-medium'>Terms of Service</span> and 
        acknowledge you've read our <span className='text-primary font-medium'>Privacy Policy</span>.
      </p>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="w-full"
          loading={loading}
        >
          Submit Feedback
        </Button>
      </Form.Item>
    </Form>
  );

  // Success Step Component
  const SuccessStep = () => (
    <div className="mt-8 text-center">
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="text-5xl mb-4 text-green-500">✓</div>
        <h3 className="text-xl font-medium mb-4">Feedback Submitted Successfully!</h3>
        <p className="mb-6">Thank you for your feedback. We appreciate your input and will use it to improve our platform.</p>
        
        <Button 
          type="primary" 
          onClick={() => {
            setCurrentStep(0);
            setFormValues({});
            setSubmissionComplete(false);
          }}
          block
        >
          Submit Another Feedback
        </Button>
        <Button 
          onClick={() => {
            window.location.href = '/';
          }}
          block
          className="mt-3"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-white py-8">
      <Container className="w-full max-w-4xl px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-2">TechTalents Support</h1>
        <p className="text-gray-600 mb-6">We value your feedback and are here to help with any issues you encounter.</p>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Need immediate assistance?</h2>
          <p className="mb-3">
            For urgent issues, you can reach our support team at:
          </p>
          <ul className="list-disc pl-6 mb-3">
            <li><strong>Email:</strong> <a href="mailto:support@techtalentscity.com" className="text-primary">support@techtalentscity.com</a></li>
            <li><strong>Discord:</strong> Join our <a href="https://discord.gg/techtalents" className="text-primary">community Discord</a></li>
            <li><strong>Response time:</strong> We aim to respond to all queries within 24 hours</li>
          </ul>
        </div>
        
        <Steps
          current={currentStep}
          className="mb-8"
          items={[
            {
              title: 'Feedback Form',
            },
            {
              title: 'Complete',
            }
          ]}
        />
        
        {currentStep === 0 && <FeedbackFormStep />}
        {currentStep === 1 && <SuccessStep />}
        
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>
            Your feedback helps us improve. We take all suggestions seriously and continuously work to enhance your experience.
          </p>
          <p className="mt-2">
            By submitting feedback, you agree to our <Link to="/terms" className="text-primary">Terms of Service</Link> and <Link to="/privacy" className="text-primary">Privacy Policy</Link>.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Support;
