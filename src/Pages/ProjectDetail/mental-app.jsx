import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Container from '../../components/Container';
import logo from '../../assets/images/techtalent.png';
import { LuArrowLeftToLine } from 'react-icons/lu';
import { useState } from 'react';

const MentalAppDetail = () => {
  // Project budget
  const [totalBudget, setTotalBudget] = useState(100);
  
  // Role amounts for mental health app project
  const [roleAmounts, setRoleAmounts] = useState({
    techArchs: 40, // $40
    techDev: 30,   // $30
    techLeads: 30  // $30
  });

  // Calculate total to verify
  const calculateTotal = () => {
    return Object.values(roleAmounts).reduce((sum, amount) => sum + amount, 0);
  };

  const total = calculateTotal();

  const handleApplyClick = () => {
    window.open('https://forms.gle/SNRmVGyKa8aT3d176', '_blank');
  };

  return (
    <Container className="w-full flex flex-col lg:flex-row gap-2 mt-10 lg:mt-20">
      <div className="w-full flex flex-col items-start bg-white">
        <Link to="/projects" className="text-[#101010] font-bold mb-4 flex items-center gap-2">
          <LuArrowLeftToLine /> <span>Back to Projects</span>
        </Link>

        <p className="text-sm text-gray-500 mb-2">Published on August 1, 2025</p>

        <h1 className="text-3xl font-bold mb-4">
          Developing a Mobile App for Mental Health Support
        </h1>

        <p className="text-[#131518] mb-2">Full-Time / Remote / <span className="text-red-500">${totalBudget}</span></p>

        {/* Budget Distribution */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Budget Distribution:</h2>
          <ul className="list-disc list-inside">
            <li><strong>TechArchs:</strong> ${roleAmounts.techArchs}</li>
            <li><strong>TechDev:</strong> ${roleAmounts.techDev}</li>
            <li><strong>TechLeads:</strong> ${roleAmounts.techLeads}</li>
            <li><strong>Total:</strong> ${total}</li>
          </ul>
        </div>

        <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Badge Skill Level:</h2>
       <p className="text-[#131518]">
       <strong>Open to All – No Badge Level Required.</strong> This project is open to participants regardless of their badge skill level. All motivated contributors are welcome to apply.</p>
    </div>

        {/* Project Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Description:</h2>
          <p>
            This project focuses on building a mobile application designed to support mental health and emotional well-being. 
            The app will offer features such as daily mood tracking, personalized mental wellness activities, access to certified mental health resources, and anonymous peer-to-peer community support. 
            It aims to empower users to monitor, maintain, and improve their mental health through technology-driven self-care solutions.
          </p>
        </div>

        {/* Project Duration */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Duration:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Start Date:</strong> August 9, 2025</li>
            <li><strong>End Date:</strong> October 25, 2025</li>
            <li><strong>Total Duration:</strong> 8 weeks</li>
          </ul>
        </div>

        {/* Required Skill Sets */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skill Sets:</h2>
          <ul className="list-disc list-inside">
            <li>Mobile App Development (React Native or Flutter)</li>
            <li>Backend Development (Firebase, Node.js, or Express)</li>
            <li>UI/UX Design specializing in mental health-focused applications</li>
            <li>Data Privacy and Security (HIPAA compliance knowledge is a plus)</li>
            <li>API Integration (mental health APIs, third-party chat support)</li>
          </ul>
        </div>

        {/* Key Tasks and Responsibilities */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Tasks and Responsibilities:</h2>
          <ul className="list-disc list-inside">
            <li>Designing user-friendly and empathetic UI for mental health tracking features</li>
            <li>Building secure authentication and user profile management systems</li>
            <li>Developing backend services to manage mood data and wellness activities</li>
            <li>Implementing data encryption to ensure user privacy</li>
            <li>Testing the application for emotional impact and accessibility standards</li>
          </ul>
        </div>

        {/* Benefits of Participation */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Benefits of Participation:</h2>
          <ul className="list-disc list-inside">
            <li>Gain hands-on experience developing apps in a sensitive and emerging sector</li>
            <li>Build a portfolio project that addresses real-world societal needs</li>
            <li>Opportunity to work on an application with meaningful social impact</li>
            <li>Learn about ethical technology development for mental health and well-being</li>
          </ul>
        </div>

        {/* Nice-to-Have Skills */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Nice-to-Have:</h2>
          <ul className="list-disc list-inside">
            <li>Experience with mental health-related research or apps</li>
            <li>Knowledge of mindfulness, CBT, or mental health support frameworks</li>
            <li>Timezone: EST or CET preferred, but all are welcome</li>
          </ul>
        </div>

        {/* Apply Button (Fixed at bottom right) */}
        <div className="fixed bottom-8 right-8">
          <Button 
            type="primary" 
            size="large" 
            className="rounded-full px-8 py-4 font-bold"
            onClick={handleApplyClick}
          >
            Apply for this Project
          </Button>
        </div>
      </div>

      {/* Sidebar Logo and Button */}
      <div className="shrink-0 w-[307px] h-[312px] rounded-2xl p-10 bg-[#F3F3FF] flex justify-center items-center flex-col gap-6">
        <img src={logo} alt="Project Logo" className="w-[148px] h-[148px] object-cover" />
        <Button 
          type="primary" 
          size="large" 
          block 
          onClick={handleApplyClick}
        >
          Apply for this Project
        </Button>
      </div>
    </Container>
  );
};

export default MentalAppDetail;
