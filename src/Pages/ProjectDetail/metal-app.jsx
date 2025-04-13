import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Container from '../../components/Container';
import logo from '../../assets/images/techtalent.png';
import { LuArrowLeftToLine } from 'react-icons/lu';

const MentalAppDetail = () => {
  return (
    <Container className='w-full flex flex-col lg:flex-row gap-2 mt-10 lg:mt-20'>
      <div className="w-full flex flex-col items-start bg-white">
        <Link to="/projects" className="text-[#101010] font-bold mb-4 flex items-center gap-2">
          <LuArrowLeftToLine /> <span>Back to projects</span>
        </Link>

        <p className="text-sm text-gray-500 mb-2">Published on May 16, 2024</p>

        <h1 className="text-3xl font-bold mb-4">
          Developing a Mobile App for Mental Health Support
        </h1>

        <p className="text-[#131518] mb-2">
          Full-Time / Remote / <span className="text-red-500">Free</span>
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Description:</h2>
          <p>
            This project focuses on creating a mobile application that provides mental health resources, mood tracking, and access to wellness activities. 
            Users will be able to journal, set mental health goals, and connect with support communities. The app will emphasize privacy and data security.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Duration:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Start Date:</strong> August 1, 2025</li>
            <li><strong>End Date:</strong> October 1, 2025</li>
            <li><strong>Total Duration:</strong> 8 weeks</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skill Sets:</h2>
          <ul className="list-disc list-inside">
            <li>Mobile App Development (React Native or Flutter)</li>
            <li>Backend Development (APIs, Node.js, Firebase)</li>
            <li>UI/UX Design (for mental wellness interfaces)</li>
            <li>Data Security and Privacy Expertise</li>
            <li>Understanding of Mental Health Research Principles</li>
          </ul>
        </div>

        <div className="fixed bottom-8 right-8">
          <Button type="primary" size="large" className="rounded-full px-8 py-4 font-bold">
            Apply for this Project
          </Button>
        </div>
      </div>

      <div className='shrink-0 w-[307px] h-[312px] rounded-2xl p-10 bg-[#F3F3FF] flex justify-center items-center flex-col gap-6'>
        <img src={logo} alt="Project Logo" className="w-[148px] h-[148px] object-cover" />
        <Button type="primary" size="large" block>Apply for this Project</Button>
      </div>
    </Container>
  );
};

export default MentalAppDetail;
