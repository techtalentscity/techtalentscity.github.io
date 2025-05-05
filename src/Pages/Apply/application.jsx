import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png';
import { Button, Steps, Collapse } from 'antd';

const { Panel } = Collapse;
const { Step } = Steps;

const Application = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Google Form URL for project applications - DO NOT CHANGE THIS URL
  const applicationFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdutVajcCzd-S2wuFfUNbnkx8KoklFFn8clR0xbYG9XBRdkvg/viewform";
  
  // URL for viewing all available projects
  const projectsListURL = "/projects"; // Update this with your actual projects listing page URL
  
  // Function to direct user to Google Form - ensures form opens correctly
  const redirectToApplicationForm = () => {
    window.open(applicationFormURL, '_blank');
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
                Welcome to <strong>TechTalents City Project Application Form</strong>! We're excited that you're interested in applying to work on a project. 
                This guide will help you understand what information you need to provide in your application.
              </p>
              <p>
                Please note that only <strong>registered members</strong> of TechTalents City can apply to projects. 
                If you haven't registered yet, please do so at www.techtalentscity.com first.
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
                <li><strong>TechPO</strong> – Product Owners (Project direction and management)</li>
                <li><strong>TechQA</strong> – Quality Assurance/Testers</li>
                <li><strong>TechLeads</strong> – Non-technical contributors (e.g., project coordinators)</li>
                <li><strong>TechArchs</strong> – Low-code/No-code developers and solution architects</li>
                <li><strong>TechGuard</strong> – Network and Cybersecurity professionals</li>
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
                and experience match the project requirements. If accepted, you'll be added to the 
                project's private channel where you can collaborate with other team members.
              </p>
              <p>
                By submitting a well-prepared application, you increase your chances of being selected and positioned 
                where your skills can make the greatest impact. We look forward to seeing how you'll contribute to TechTalents City!
              </p>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-white py-8">
      <Container className="w-full max-w-4xl px-4 md:px-8">
        <Link to={'/'} className="block mb-6">
          <img src={logo} alt="logo" className="w-[250px] object-cover object-center" />
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">Apply to a TTC Project</h1>
        <p className="text-gray-600 mb-6">Join a project and collaborate with talented individuals</p>
        
        {/* Application Guide Section */}
        <ApplicationGuide />
        
        <div className="w-full bg-gray-100 p-9 rounded-lg text-center mb-8">
          <h2 className="text-2xl xl:text-3xl font-bold">Ready to Apply?</h2>
          <p className="text-sm xl:text-base my-6">
            Our application process collects essential information to match you with the right project. 
            You'll need to provide your contact details, preferred role, and skill level.
          </p>
          
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">Required Information:</h3>
            <ul className="text-left mx-auto max-w-md">
              <li className="mb-2">• First and Last Name</li>
              <li className="mb-2">• Email Address</li>
              <li className="mb-2">• Project Title you're applying for</li>
              <li className="mb-2">• TechTalents Badge Role (TechPO, TechQA, TechLeads, TechArchs, TechGuard)</li>
              <li className="mb-2">• Your relevant skills (technical and non-technical)</li>
              <li className="mb-2">• Badge Skill Level (Novice, Beginner, Intermediate, Expert)</li>
              <li className="mb-2">• Contact number</li>
            </ul>
          </div>
          
          {/* Important: This button must remain visible and functional */}
          <Button 
            type="primary" 
            block 
            className="py-5 px-12 font-bold" 
            onClick={redirectToApplicationForm}
          >
            Apply to a Project Now
          </Button>
        </div>
        
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

export default Application;
