import Container from "../../components/Container";
import PostAProject from "../Home/PostAProject";
import techtalent from '../../assets/images/techtalent.png';
import AllProjects from "./AllProjects";
import { Input } from "antd";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineAdjustments } from "react-icons/hi";

const Projects = () => {

  const projects = [
    {
      title: 'Building an AI-powered Agent for Customer Engagement',
      skills: [
        'NLP Engineers',
        'Machine Learning Developers',
        'Frontend Developers',
        'Backend Developers',
        'UI/UX Designers',
        'Cybersecurity Specialists'
      ],
      logo: techtalent,
      verified: true,
      premium: true,
      price: '$150',
      link: '/projects/ai-agent',
    },
    {
      title: 'Developing a Mobile App for Mental Health Support',
      skills: [
        'Mobile App Developers',
        'UI/UX Designers',
        'Backend Developers',
        'Data Security Specialists',
        'Mental Health Researchers'
      ],
      logo: techtalent,
      verified: true,
      premium: true,
      price: '$100',
      link: '/projects/mental-app',
    },
    {
      title: 'Real-Time Notification System for Tech Platforms',
      skills: [
        'Realtime Engineers',
        'Socket.io Developers',
        'System Integrators',
        'Cloud Infrastructure Specialists'
      ],
      logo: techtalent,
      verified: true,
      premium: true,
      price: '$125',
      link: '/projects/real-time-notification-system',
    },
    {
      title: 'Blockchain-based DeFi Lending Platform',
      skills: [
        'Solidity Developers',
        'Smart Contract Auditors',
        'Frontend Developers',
        'Backend/API Developers',
        'DeFi Strategists'
      ],
      logo: techtalent,
      verified: true,
      premium: false,
      price: 'Free',
      link: '/projects/blockchain-defi',
    },
    {
      title: 'AI-Driven Climate Change Prediction Platform',
      skills: [
        'AI/ML Researchers',
        'Data Scientists',
        'Frontend Developers',
        'Climate Experts',
        'Visualization Engineers'
      ],
      logo: techtalent,
      verified: true,
      premium: false,
      price: 'Free',
      link: '/projects/climate-prediction',
    }
  ];

  return (
    <Container className={'pt-9'}>
      <h1 className="text-5xl md:text-6xl font-bold pb-6 text-center">Projects</h1>

      <div className="flex items-center space-x-2 lg:space-x-6 mb-4">
        <div className="flex gap-2 items-center bg-[#F2F2F2] rounded-xl py-4 px-5 shadow-md">
          <HiOutlineAdjustments />
          <p className="text-sm hidden md:block">Filters</p>
        </div>

        <div className='w-full rounded-xl shadow-md bg-white/80 flex justify-between items-center py-2 px-5'>
          <Input
            placeholder="Try searching for projects..."
            className="flex-grow border-none mr-4"
          />
          <div className="bg-black w-10 h-10 rounded-full p-3 flex justify-center items-center">
              <IoIosSearch size={24} color='white' />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start md:p-4 space-y-4 lg:space-y-0 lg:space-x-8 my-10 lg:my-[60px]">
        <div className="lg:flex-grow">
          <AllProjects projects={projects} />
        </div>
        <div className="lg:w-1/4 flex-shrink-0 !mb-8">
          <PostAProject />
        </div>
      </div>
    </Container>
  );
}

export default Projects;
