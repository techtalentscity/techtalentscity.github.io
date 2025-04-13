import { Link } from 'react-router-dom';
import { Button } from 'antd';
import logo from '../../assets/images/techtalent.png';
import { LuArrowLeftToLine } from 'react-icons/lu';
import Container from '../../components/Container';

const ProjectDetail = () => {
  return (
    <Container className='w-full flex flex-col lg:flex-row gap-2 mt-10 lg:mt-20'>
      <div className="w-full flex flex-col items-start bg-white">
        <Link to="/projects" className="text-[#101010] font-bold mb-4 flex items-center gap-2">
          <LuArrowLeftToLine /> <span>Back to projects</span>
        </Link>
        <p className="text-sm text-gray-500 mb-2">Published on May 16, 2024</p>
        <h1 className="text-3xl font-bold mb-4">Developing a Mobile App for Mental Health Support</h1>
        <p className="text-[#131518] mb-2">Full-Time / Remote / <span className="text-red-500">Free</span></p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Description:</h2>
          <p>
            This project focuses on building a mobile application that offers mental health support tools, including mood tracking, mindfulness exercises, journaling prompts, anonymous peer support communities, and access to mental health resources. The app will use intuitive design and simple AI elements to encourage users to prioritize mental well-being in their daily lives.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Duration:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Start Date:</strong> August 1, 2025</li>
            <li><strong>End Date:</strong> October 1, 2025</li>
            <li><strong>Total Duration:</strong> 2 months</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skill Sets:</h2>
          <ul className="list-disc list-inside">
            <li>Mobile App Development (React Native, Flutter)</li>
            <li>UI/UX Design (Mental health friendly)</li>
            <li>Backend Development (Node.js, Firebase, or AWS Amplify)</li>
            <li>Basic AI/ML for emotion classification (optional)</li>
            <li>Data security and privacy knowledge</li>
            <li>Mental health content research (optional)</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Tasks and Responsibilities:</h2>
          <ul className="list-disc list-inside">
            <li>Design wireframes and mental health-sensitive UX.</li>
            <li>Develop mood tracking and journaling modules.</li>
            <li>Implement basic AI-powered emotion detection (optional).</li>
            <li>Set up backend systems for secure user data storage.</li>
            <li>Test, refine, and publish MVP to app stores.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Benefits of Participation:</h2>
          <ul className="list-disc list-inside">
            <li>Hands-on experience developing a socially impactful app.</li>
            <li>Portfolio showcase of mobile app development skills.</li>
            <li>Collaborative team-building and global exposure.</li>
            <li>Contributing to mental health awareness and innovation.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Nice-to-have:</h2>
          <ul className="list-disc list-inside">
            <li>Experience with accessibility standards for mobile apps.</li>
            <li>Experience building community features in apps (e.g., forums, chat).</li>
          </ul>
        </div>

        <div className="fixed bottom-8 right-8">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScIbS6ykk3RY8bXUJRg52oikbt8mcvu8eOdj2x3w9xTeFeKmg/viewform" target="_blank" rel="noopener noreferrer">
            <Button type="primary" size="large" className="rounded-full px-8 py-4 font-bold">
              Apply for this Project
            </Button>
          </a>
        </div>
      </div>
      <div className='shrink-0 w-[307px] h-[312px] rounded-2xl p-10 bg-[#F3F3FF] flex justify-center items-center flex-col gap-6'>
        <img src={logo} alt="Project Logo" className="w-[148px] h-[148px] object-cover" />
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScIbS6ykk3RY8bXUJRg52oikbt8mcvu8eOdj2x3w9xTeFeKmg/viewform" target="_blank" rel="noopener noreferrer">
          <Button type="primary" size="large" block>Apply for this Project</Button>
        </a>
      </div>
    </Container>
  );
}

export default ProjectDetail;

