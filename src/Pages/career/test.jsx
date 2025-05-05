import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TTCCareerForm = () => {
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

  // Google Form submission URL - this would connect to the response sheet
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSe1ZJ2I0uhJg1xDywYRgwaYpqBGzwAg-zIZ-Exjey2CORZhvA/formResponse";
  
  // Form field entry IDs from the Google Form
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleContinue = () => {
    // Validate required fields
    const requiredFields = Object.keys(formValues);
    const emptyFields = requiredFields.filter(field => !formValues[field]);
    
    if (emptyFields.length > 0) {
      setErrorMessage("Please fill out all required fields before continuing.");
      return;
    }

    // Validate email format
    if (!validateEmail(formValues.emailAddress)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    setCurrentStep(1);
  };

  // Verify CAPTCHA and submit form if correct
  const handleVerifyCaptcha = () => {
    if (parseInt(captchaAnswer) === mathProblem.result) {
      setCaptchaVerified(true);
      submitFormToGoogleSheet();
    } else {
      setCaptchaVerified(false);
      generateMathProblem();
      setErrorMessage("Incorrect answer. Please try again.");
    }
  };
  
  // Go back to the form step
  const handleBack = () => {
    setCurrentStep(0);
    setErrorMessage("");
  };

  // Submit form to Google Form/Sheet
  const submitFormToGoogleSheet = () => {
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
    
    // In a real implementation, you would use fetch:
    /*
    fetch(googleFormURL, {
      method: 'POST',
      mode: 'no-cors', // Important for cross-origin requests to Google Forms
      body: formData
    })
    .then(() => {
      setSubmissionComplete(true);
      setCurrentStep(2);
    })
    .catch((error) => {
      setErrorMessage("Submission failed. Please try again.");
      console.error('Error submitting form:', error);
    })
    .finally(() => {
      setLoading(false);
    });
    */
    
    // Simulate submission with a timeout
    setTimeout(() => {
      setSubmissionComplete(true);
      setCurrentStep(2);
      setLoading(false);
      
      // Store submission in localStorage for demo purposes
      try {
        const previousSubmissions = JSON.parse(localStorage.getItem('ttcFormSubmissions') || '[]');
        previousSubmissions.push({
          ...formValues,
          submissionDate: new Date().toISOString(),
          userId: `user_${Math.floor(Math.random() * 10000)}`
        });
        localStorage.setItem('ttcFormSubmissions', JSON.stringify(previousSubmissions));
      } catch (error) {
        console.error('Error storing submission:', error);
      }
    }, 1500);
  };

  // Career Guide Component
  const CareerGuide = () => (
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">🧭 Career Test Guide</h2>
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
  );

  // Steps component for tracking progress
  const Steps = () => (
    <div className="mb-8">
      <div className="flex justify-center items-center">
        {[
          { title: 'Application Form', state: currentStep === 0 ? 'current' : currentStep > 0 ? 'complete' : 'upcoming' },
          { title: 'Verification', state: currentStep === 1 ? 'current' : currentStep > 1 ? 'complete' : 'upcoming' },
          { title: 'Complete', state: currentStep === 2 ? 'current' : 'upcoming' }
        ].map((step, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <div className={`h-0.5 w-10 ${step.state === 'upcoming' ? 'bg-gray-300' : 'bg-blue-600'}`}></div>
            )}
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
              step.state === 'complete' ? 'bg-blue-600' : 
              step.state === 'current' ? 'border-2 border-blue-600 text-blue-600' : 
              'border-2 border-gray-300 text-gray-400'
            }`}>
              {step.state === 'complete' ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className={`absolute top-10 -ml-4 text-xs whitespace-nowrap ${
              step.state === 'upcoming' ? 'text-gray-400' : 'text-blue-600 font-medium'
            }`}>
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Form Step Component
  const ApplicationFormStep = () => (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">TTC Career Test</h1>
      <p className="text-gray-600 mb-6">Join TechTalents City and explore your tech career possibilities</p>
      
      {/* Application Guide Section */}
      <div className="mb-8">
        <div 
          onClick={() => setShowGuide(!showGuide)} 
          className="flex items-center text-primary font-medium cursor-pointer mb-2 text-blue-600"
        >
          <span className="mr-2">{showGuide ? '▼' : '►'}</span>
          <span>Click here to view Career Test Guide</span>
        </div>
        
        {showGuide && <CareerGuide />}
      </div>
      
      <Steps />
      
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{errorMessage}</p>
        </div>
      )}
      
      <form className="bg-white rounded-lg shadow-md p-6">
        {/* Personal Information Section */}
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formValues.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="emailAddress"
              value={formValues.emailAddress}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>
        
        {/* Career Information Section */}
        <h2 className="text-xl font-semibold mb-4 mt-8">Career Information</h2>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            What do you like doing best? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="whatDoYouLikeDoing"
            value={formValues.whatDoYouLikeDoing}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your favorite activities or tasks"
            rows="3"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Are you more interested in working for: <span className="text-red-500">*</span>
          </label>
          <select
            name="workingFor"
            value={formValues.workingFor}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Startups">Startups and entrepreneurial ventures</option>
            <option value="Large tech companies">Large tech companies</option>
            <option value="Nonprofit organizations">Nonprofit or mission-driven organizations</option>
            <option value="Government">Private sector or government agencies</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            How do you prefer to work? <span className="text-red-500">*</span>
          </label>
          <select
            name="preferToWork"
            value={formValues.preferToWork}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Working independently">Working independently on solo projects</option>
            <option value="Collaborating in teams">Collaborating within a team</option>
            <option value="Leading others">Leading others and managing the vision</option>
            <option value="Flexible">Being flexible and adaptable across work styles</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            How comfortable are you with learning new tools or programming languages? <span className="text-red-500">*</span>
          </label>
          <select
            name="learningComfort"
            value={formValues.learningComfort}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Very comfortable">Very comfortable – I pick things up quickly</option>
            <option value="Somewhat comfortable">Somewhat comfortable – I may need extra time</option>
            <option value="Not comfortable">Not comfortable – I need structured support</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            What excites you most about working in tech? <span className="text-red-500">*</span>
          </label>
          <select
            name="techExcitement"
            value={formValues.techExcitement}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Solving complex problems">Solving complex problems</option>
            <option value="Building applications">Building applications and platforms</option>
            <option value="Exploring data">Exploring data and gaining insights</option>
            <option value="System security">Ensuring system security and reliability</option>
            <option value="Innovation">Driving real-world innovation and impact</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Which tech areas are you most curious about or interested in learning? <span className="text-red-500">*</span>
          </label>
          <select
            name="techAreas"
            value={formValues.techAreas}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            multiple={false}
          >
            <option value="">Select your primary interest</option>
            <option value="Software Development">Software Development</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="AI/ML">Artificial Intelligence & Machine Learning</option>
            <option value="Blockchain">Blockchain & Web3</option>
            <option value="Product Management">Product Management</option>
            <option value="UX/UI Design">UX/UI Design</option>
            <option value="Data Analysis">Data Analysis & Engineering</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Which tech-related activities have you enjoyed the most so far? <span className="text-red-500">*</span>
          </label>
          <p className="text-gray-600 text-sm italic mb-2">(even if it's informal — e.g., tinkering with websites, playing with data, cybersecurity games, etc.)</p>
          <textarea
            name="techActivities"
            value={formValues.techActivities}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe activities you've enjoyed"
            rows="3"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            What is one personal strength you believe will help you succeed in tech? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="personalStrength"
            value={formValues.personalStrength}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., creativity, communication, leadership, perseverance"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            What is your biggest motivation for pursuing a tech career? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="motivation"
            value={formValues.motivation}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What drives you toward technology?"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Which of these best describes your current experience level in tech? <span className="text-red-500">*</span>
          </label>
          <select
            name="experienceLevel"
            value={formValues.experienceLevel}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your experience level</option>
            <option value="Beginner">Beginner - Just starting out</option>
            <option value="Novice">Novice - Some basic knowledge</option>
            <option value="Intermediate">Intermediate - Completed projects</option>
            <option value="Advanced">Advanced - Professional experience</option>
            <option value="Expert">Expert - Many years of experience</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Are you open to working in emerging areas like AI, Blockchain, or Cybersecurity if given the right support? <span className="text-red-500">*</span>
          </label>
          <select
            name="emergingAreas"
            value={formValues.emergingAreas}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your answer</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Do you already have any certifications or completed courses? <span className="text-red-500">*</span>
          </label>
          <select
            name="certifications"
            value={formValues.certifications}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your answer</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            List Any Certifications that you have <span className="text-red-500">*</span>
          </label>
          <textarea
            name="certificationsList"
            value={formValues.certificationsList}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 'None' if you don't have any"
            rows="2"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Which of the following tools or platforms have you used before? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="toolsUsed"
            value={formValues.toolsUsed}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., GitHub, Figma, Python, JavaScript, Google Cloud"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            How much time can you realistically commit to learning or working on a project each week? <span className="text-red-500">*</span>
          </label>
          <select
            name="timeCommitment"
            value={formValues.timeCommitment}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your answer</option>
            <option value="1-5 hours">1-5 hours</option>
            <option value="5-10 hours">5-10 hours</option>
            <option value="10-20 hours">10-20 hours</option>
            <option value="20+ hours">20+ hours</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            What type of impact do you want your work to have? <span className="text-red-500">*</span>
          </label>
          <select
            name="workImpact"
            value={formValues.workImpact}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your answer</option>
            <option value="Empowering communities">Empowering underrepresented communities</option>
            <option value="Business solutions">Building business-focused solutions</option>
            <option value="Healthcare innovation">Advancing innovation in science or healthcare</option>
            <option value="Education">Supporting global education</option>
            <option value="Financial systems">Improving financial systems</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            What kind of guidance do you need most right now? <span className="text-red-500">*</span>
          </label>
          <select
            name="guidanceNeeded"
            value={formValues.guidanceNeeded}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your answer</option>
            <option value="Skill roadmap">A skill development roadmap</option>
            <option value="Project matching">Matching with suitable projects</option>
            <option value="Career mentorship">Career mentorship</option>
            <option value="Portfolio help">Help with your resume or portfolio</option>
            <option value="All of the above">All of the above</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            In the next 12 months, where would you like to be in your tech journey? <span className="text-red-500">*</span>
          </label>
          <select
            name="futureGoals"
            value={formValues.futureGoals}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your answer</option>
            <option value="Starting first project">Starting your first real-world project</option>
            <option value="Securing position">Securing an internship or full-time position</option>
            <option value="Building portfolio">Building and showcasing a complete portfolio</option>
            <option value="Leading team">Leading a team or managing a technical initiative</option>
          </select>
        </div>
        
        <p className='pb-6 text-sm text-gray-600'>
          By continuing, you agree to the <span className='text-blue-600 font-medium'>Terms of Service</span> and 
          acknowledge you've read our <span className='text-blue-600 font-medium'>Privacy Policy</span>.
        </p>
        
        <button 
          type="button" 
          onClick={handleContinue}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded"
        >
          Continue to Verification
        </button>
      </form>
    </div>
  );

  // CAPTCHA Verification Step Component
  const CaptchaStep = () => (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">Verify your Identity</h1>
      <p className="text-gray-600 mb-6">Please complete this verification to submit your career test</p>
      
      <Steps />
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Verify you're human</h3>
        <p className="mb-6">Please solve this math problem to submit your application:</p>
        
        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{errorMessage}</p>
          </div>
        )}
        
        <div className="text-center mb-6 bg-gray-50 p-6 rounded-lg">
          <span className="text-2xl font-bold">{mathProblem.num1} + {mathProblem.num2} = ?</span>
        </div>
        
        <input 
          placeholder="Enter your answer" 
          className="w-full p-3 mb-4 border rounded" 
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          type="number"
        />
        
        <div className="flex flex-col gap-3">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded disabled:bg-blue-300"
            onClick={handleVerifyCaptcha}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Verify & Submit'}
          </button>
          
          <div className="flex gap-3">
            <button 
              className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50"
              onClick={generateMathProblem}
              disabled={loading}
            >
              New Problem
            </button>
            
            <button 
              className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50"
              onClick={handleBack}
              disabled={loading}
            >
              Back to Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Success Step Component
  const SuccessStep = () => (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">Submission Complete</h1>
      <p className="text-gray-600 mb-6">Thank you for completing the TTC Career Test</p>
      
      <Steps />
      
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h3 className="text-xl font-medium mb-4">Form Submitted Successfully!</h3>
        <p className="mb-6">Thank you for completing the TTC Career Test. We will review your submission and get back to you shortly.</p>
        <p className="mb-6 text-sm text-gray-600">If your details match our records, you'll receive a login link soon. Not registered yet? <a href="#" className="text-blue-600 underline">Register here</a>.</p>
        
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          onClick={() => {
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
          }}
        >
          Submit Another Response
        </button>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>
          By submitting this form, you agree to the <span className="text-blue-600 font-medium">Terms of Service</span> and 
          acknowledge you've read our <span className="text-blue-600 font-medium">Privacy Policy</span>.
        </p>
        <p className="mt-2">
          Only registered members will be granted access to TechTalents City upon acceptance.
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gray-50 min-h-screen py-8">
      {currentStep === 0 && <ApplicationFormStep />}
      {currentStep === 1 && <CaptchaStep />}
      {currentStep === 2 && <SuccessStep />}
    </div>
  );
