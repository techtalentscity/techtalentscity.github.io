import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { LuArrowLeftToLine } from 'react-icons/lu';
import logo from '../../assets/images/techtalent.png';
import Container from '../../components/Container';

const ProjectDetail = () => {
  const [totalBudget, setTotalBudget] = useState(200); // Total project budget

  const [distribution, setDistribution] = useState({
    techDev: 35,
    techLeads: 30,
    techArchs: 20,
    techMo: 15
  });

  const calculateAmounts = () => {
    return {
      techDev: (totalBudget * distribution.techDev / 100).toFixed(2),
      techLeads: (totalBudget * distribution.techLeads / 100).toFixed(2),
      techArchs: (totalBudget * distribution.techArchs / 100).toFixed(2),
      techMo: (totalBudget * distribution.techMo / 100).toFixed(2)
    };
  };

  const amounts = calculateAmounts();

  return (
    <Container className="w-full flex flex-col lg:flex-row gap-2 mt-10 lg:mt-20">
      <div className="w-full flex flex-col items-start bg-white">
        <Link to="/projects" className="text-[#101010] font-bold mb-4 flex items-center gap-2">
          <LuArrowLeftToLine /> <span>Back to projects</span>
        </Link>

        <p className="text-sm text-gray-500 mb-2">Published on May 16, 2024</p>
        <h1 className="text-3xl font-bold mb-4">Building an AI-powered Agent for Customer Engagement</h1>
        <p className="text-[#131518] mb-2">Full-Time / Remote / <span className="text-red-500">${totalBudget}</span></p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Budget Distribution:</h2>
          <ul className="list-disc list-inside">
            <li><strong>TechDev:</strong> ${amounts.techDev}</li>
            <li><strong>TechLeads:</strong> ${amounts.techLeads}</li>
            <li><strong>TechArchs:</strong> ${amounts.techArchs}</li>
            <li><strong>TechMo:</strong> ${amounts.techMo}</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Badge Skill Level:</h2>
          <p className="text-[#131518]">
            <strong>Open to All – No Badge Level Required.</strong> This project is open to participants regardless of their badge skill level. All motivated contributors are welcome to apply.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Description:</h2>
          <p>
            This project will develop a conversational AI agent to improve customer service efficiency in banking. The solution will simulate human-like conversations, answer banking-related questions, and help customers carry out simple transactions such as balance inquiries or card blocking. The AI agent will be designed for deployment across web and mobile platforms.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Duration:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Start Date:</strong> June 14, 2025</li>
            <li><strong>End Date:</strong> August 16, 2025</li>
            <li><strong>Total Duration:</strong> 9 weeks</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skill Sets:</h2>
          <ul className="list-disc list-inside">
            <li>Natural Language Processing (NLP)</li>
            <li>Machine Learning / Deep Learning</li>
            <li>Python Programming</li>
            <li>Frontend Web Development (React or similar)</li>
            <li>Backend Development (APIs, Node.js or Flask)</li>
            <li>UI/UX Design (for chatbot interface)</li>
            <li>Cybersecurity (basic secure communication)</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Tasks and Responsibilities:</h2>
          <ul className="list-disc list-inside">
            <li>Design and develop the AI model for banking interactions.</li>
            <li>Train the chatbot to handle at least 5 different banking intents.</li>
            <li>Build secure API endpoints for backend integration.</li>
            <li>Develop an intuitive front-end chatbot interface.</li>
            <li>Test, deploy, and optimize the agent for both web and mobile platforms.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Benefits of Participation:</h2>
          <ul className="list-disc list-inside">
            <li>Hands-on experience with AI and real-world fintech applications.</li>
            <li>Portfolio project showcasing machine learning, AI, and full-stack development skills.</li>
            <li>Collaborative learning with a global tech community.</li>
            <li>Experience working in a cross-functional agile team structure.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Nice-to-have:</h2>
          <ul className="list-disc list-inside">
            <li>Experience with LLM (Large Language Model) APIs (e.g., OpenAI, HuggingFace)</li>
            <li>Experience integrating AI into mobile apps (Flutter, React Native)</li>
            <li>Experience working on fintech or banking platforms.</li>
          </ul>
        </div>

        <div className="fixed bottom-8 right-8">
          <Link to="/apply/application">
            <Button type="primary" size="large" className="rounded-full px-8 py-4 font-bold">
              Apply for this Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="shrink-0 w-[307px] h-[312px] rounded-2xl p-10 bg-[#F3F3FF] flex justify-center items-center flex-col gap-6">
        <img src={logo} alt="Project Logo" className="w-[148px] h-[148px] object-cover" />
        <Link to="/apply/application">
          <Button type="primary" size="large" block>
            Apply for this Project
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default ProjectDetail;
