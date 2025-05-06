// src/Pages/ProjectDetail/index.jsx
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LuArrowLeftToLine } from 'react-icons/lu';
import logo from '../../assets/images/techtalent.png';
import Container from '../../components/Container';

// Mock fetch function - in a real app, this would be an API call
const fetchProjectDetails = async (id) => {
  // Sample projects database
  const projects = [
    {
      id: 1,
      title: 'Building an AI-powered Agent for Customer Engagement',
      description: 'This project will develop a conversational AI agent to improve customer service efficiency in banking.',
      duration: {
        start: 'May 24, 2025',
        end: 'July 24, 2025',
        total: '8 weeks'
      },
      employmentType: 'Full-Time / Remote / Free',
      publishDate: 'May 16, 2024',
      skills: [
        'Natural Language Processing (NLP)',
        'Machine Learning / Deep Learning',
        'Python Programming',
        'Frontend Web Development (React or similar)',
        'Backend Development (APIs, Node.js or Flask)',
        'UI/UX Design (for chatbot interface)',
        'Cybersecurity (basic secure communication)'
      ],
      tasks: [
        'Design and develop the AI model for banking interactions.',
        'Train the chatbot to handle at least 5 different banking intents.',
        'Build secure API endpoints for backend integration.',
        'Develop an intuitive front-end chatbot interface.',
        'Test, deploy, and optimize the agent for both web and mobile platforms.'
      ],
      benefits: [
        'Hands-on experience with AI and real-world fintech applications.',
        'Portfolio project showcasing machine learning, AI, and full-stack development skills.',
        'Collaborative learning with a global tech community.',
        'Experience working in a cross-functional agile team structure.'
      ],
      niceToHave: [
        'Experience with LLM (Large Language Model) APIs (e.g., OpenAI, HuggingFace)',
        'Experience integrating AI into mobile apps (Flutter, React Native)',
        'Experience working on fintech or banking platforms.'
      ]
    },
    {
      id: 2,
      title: 'Real-time Notification System',
      description: 'Develop a comprehensive system that provides real-time notifications for users across multiple platforms.',
      duration: {
        start: 'June 1, 2025',
        end: 'July 31, 2025',
        total: '8 weeks'
      },
      employmentType: 'Part-Time / Hybrid / Paid',
      publishDate: 'May 10, 2024',
      skills: [
        'WebSockets',
        'React',
        'Node.js',
        'Redis',
        'Push Notification APIs',
        'Frontend Development',
        'Backend Development'
      ],
      tasks: [
        'Design the notification system architecture',
        'Implement WebSocket connections for real-time updates',
        'Develop notification preferences and management UI',
        'Create notification delivery systems for multiple channels',
        'Implement read/unread status tracking'
      ],
      benefits: [
        'Experience with real-time communication technologies',
        'Full-stack development portfolio project',
        'Work with modern web application architecture',
        'Collaborate with UX designers and backend engineers'
      ],
      niceToHave: [
        'Experience with Service Workers',
        'Knowledge of Firebase Cloud Messaging',
        'Experience with Progressive Web Apps'
      ]
    },
    {
      id: 3,
      title: 'Blockchain-based Supply Chain Tracking',
      description: 'Create a decentralized application for transparent tracking of products through a global supply chain.',
      duration: {
        start: 'May 30, 2025',
        end: 'August 15, 2025',
        total: '11 weeks'
      },
      employmentType: 'Full-Time / Remote / Paid',
      publishDate: 'May 5, 2024',
      skills: [
        'Blockchain Development',
        'Smart Contracts',
        'Solidity',
        'Web3.js',
        'React',
        'Supply Chain Knowledge',
        'API Development'
      ],
      tasks: [
        'Design blockchain architecture for supply chain tracking',
        'Develop smart contracts for product verification',
        'Create user interfaces for various supply chain participants',
        'Implement QR code/RFID integration for physical products',
        'Build dashboard for analytics and reporting'
      ],
      benefits: [
        'Work on cutting-edge blockchain technology',
        'Develop real-world solutions for global supply chains',
        'Build expertise in decentralized applications',
        'Create impactful technology for transparency and authenticity'
      ],
      niceToHave: [
        'Experience with Ethereum or other blockchain platforms',
        'Knowledge of supply chain operations',
        'Experience with IoT devices or sensors'
      ]
    },
    {
      id: 4,
      title: 'Climate Data Visualization Platform',
      description: 'Develop an interactive platform to visualize climate data and make environmental information accessible to the public.',
      duration: {
        start: 'June 15, 2025',
        end: 'August 31, 2025',
        total: '11 weeks'
      },
      employmentType: 'Part-Time / Remote / Free',
      publishDate: 'May 12, 2024',
      skills: [
        'Data Visualization',
        'D3.js',
        'React',
        'Python',
        'Data Analysis',
        'UI/UX Design',
        'API Integration'
      ],
      tasks: [
        'Design interactive visualizations for climate data',
        'Integrate with climate data APIs and datasets',
        'Create user-friendly interfaces for data exploration',
        'Develop tools for comparing historical climate trends',
        'Build educational components to explain climate science concepts'
      ],
      benefits: [
        'Work on environmentally impactful technology',
        'Develop advanced data visualization skills',
        'Create portfolio pieces showcasing technical and design abilities',
        'Collaborate with climate scientists and environmental experts'
      ],
      niceToHave: [
        'Background in environmental science or related field',
        'Experience with geospatial data visualization',
        'Knowledge of climate datasets or APIs'
      ]
    },
    {
      id: 5,
      title: 'Mental Health Support Application',
      description: 'Create a mobile application that provides mental health resources, mood tracking, and guided meditation exercises.',
      duration: {
        start: 'June 1, 2025',
        end: 'August 15, 2025',
        total: '10 weeks'
      },
      employmentType: 'Full-Time / Remote / Paid',
      publishDate: 'May 8, 2024',
      skills: [
        'Mobile App Development',
        'React Native',
        'UI/UX Design',
        'Backend Development',
        'API Integration',
        'Data Security',
        'Healthcare Technology'
      ],
      tasks: [
        'Design user-friendly interfaces for mental health tracking',
        'Develop mood journal and analytics features',
        'Create guided meditation and relaxation exercises',
        'Implement secure data storage for sensitive health information',
        'Build community support features with privacy controls'
      ],
      benefits: [
        'Create technology with positive social impact',
        'Develop skills in healthcare application development',
        'Learn about privacy and security for health data',
        'Work with mental health professionals on product design'
      ],
      niceToHave: [
        'Experience with health or wellness applications',
        'Knowledge of HIPAA or healthcare data regulations',
        'Background in psychology or mental health'
      ]
    }
  ];

  // Find the project with the matching ID
  const project = projects.find(p => p.id === parseInt(id));
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!project) {
    throw new Error('Project not found');
  }
  
  return project;
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        // If no id is provided (for the static page), use the default project
        if (!id) {
          setProject({
            id: 1,
            title: 'Building an AI-powered Agent for Customer Engagement',
            description: 'This project will develop a conversational AI agent to improve customer service efficiency in banking.',
            duration: {
              start: 'May 24, 2025',
              end: 'July 24, 2025',
              total: '8 weeks'
            },
            employmentType: 'Full-Time / Remote / Free',
            publishDate: 'May 16, 2024',
            skills: [
              'Natural Language Processing (NLP)',
              'Machine Learning / Deep Learning',
              'Python Programming',
              'Frontend Web Development (React or similar)',
              'Backend Development (APIs, Node.js or Flask)',
              'UI/UX Design (for chatbot interface)',
              'Cybersecurity (basic secure communication)'
            ],
            tasks: [
              'Design and develop the AI model for banking interactions.',
              'Train the chatbot to handle at least 5 different banking intents.',
              'Build secure API endpoints for backend integration.',
              'Develop an intuitive front-end chatbot interface.',
              'Test, deploy, and optimize the agent for both web and mobile platforms.'
            ],
            benefits: [
              'Hands-on experience with AI and real-world fintech applications.',
              'Portfolio project showcasing machine learning, AI, and full-stack development skills.',
              'Collaborative learning with a global tech community.',
              'Experience working in a cross-functional agile team structure.'
            ],
            niceToHave: [
              'Experience with LLM (Large Language Model) APIs (e.g., OpenAI, HuggingFace)',
              'Experience integrating AI into mobile apps (Flutter, React Native)',
              'Experience working on fintech or banking platforms.'
            ]
          });
          setLoading(false);
        } else {
          const data = await fetchProjectDetails(id);
          setProject(data);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-16">
        <div className="text-center">Loading project details...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-6">{error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </Container>
    );
  }

  // Return the existing layout with dynamic data
  return (
    <Container className='w-full flex flex-col lg:flex-row gap-2 mt-10 lg:mt-20'>
      <div className="w-full flex flex-col items-start bg-white">
        <Link to="/projects" className="text-[#101010] font-bold mb-4 flex items-center gap-2">
          <LuArrowLeftToLine /> <span>Back to projects</span>
        </Link>
        <p className="text-sm text-gray-500 mb-2">Published on {project.publishDate}</p>
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-[#131518] mb-2">{project.employmentType}</p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Description:</h2>
          <p>{project.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Duration:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Start Date:</strong> {project.duration.start}</li>
            <li><strong>End Date:</strong> {project.duration.end}</li>
            <li><strong>Total Duration:</strong> {project.duration.total}</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skill Sets:</h2>
          <ul className="list-disc list-inside">
            {project.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Tasks and Responsibilities:</h2>
          <ul className="list-disc list-inside">
            {project.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Benefits of Participation:</h2>
          <ul className="list-disc list-inside">
            {project.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Nice-to-have:</h2>
          <ul className="list-disc list-inside">
            {project.niceToHave.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
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
      <div className='shrink-0 w-[307px] h-[312px] rounded-2xl p-10 bg-[#F3F3FF] flex justify-center items-center flex-col gap-6'>
        <img src={logo} alt="Project Logo" className="w-[148px] h-[148px] object-cover" />
        <Link to="/apply/application">
          <Button type="primary" size="large" block>Apply for this Project</Button>
        </Link>
      </div>
    </Container>
  );
};

export default ProjectDetail;
