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
        <h1 className="text-3xl font-bold mb-4">Augmented Reality (AR) Application Development</h1>
        <p className="text-[#131518] mb-2">Full-Time / Remote / <span className="text-red-500">Free</span></p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Description:</h2>
          <p>
            The Augmented Reality (AR) Application Development project focuses on creating immersive AR experiences for various platforms, including mobile devices, smart glasses, and augmented reality headsets. Participants will collaborate to design and develop AR applications that enhance real-world interactions and solve practical problems across industries.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Duration: 1 month</h2>
          <ul className="list-disc list-inside">
            <li><strong>Start Date:</strong> 1st June, 2024</li>
            <li><strong>End Date:</strong> 1st July, 2024</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skill Sets:</h2>
          <ul className="list-disc list-inside">
            <li><strong>AR Development:</strong> Proficiency in AR development frameworks such as Unity3D, ARKit (for iOS), ARCore (for Android), or Vuforia.</li>
            <li><strong>3D Modeling and Animation:</strong> Experience in creating 3D models, animations, and assets using tools like Blender, Maya, or 3ds Max.</li>
            <li><strong>User Interaction Design:</strong> Understanding of user experience (UX) and user interface (UI) design principles for creating intuitive and engaging AR interfaces.</li>
            <li><strong>Cross-platform Development:</strong> Ability to develop AR applications that run seamlessly across multiple platforms and devices.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Tasks and Responsibilities:</h2>
          <ul className="list-disc list-inside">
            <li>Conceptualization and Planning: Collaborate with the team to brainstorm ideas, define project goals, and establish the scope of the AR application.</li>
            <li>Prototyping and Design: Create wireframes, storyboards, and prototypes to visualize the user experience and interaction flow within the AR environment.</li>
            <li>Development: Implement AR features, integrate 3D assets, animations, and interactive elements into the application using the chosen development framework.</li>
            <li>Testing and Optimization: Conduct rigorous testing to ensure the stability, performance, and usability of the AR application across different devices and environments.</li>
            <li>Documentation and Presentation: Document the development process, technical specifications, and user guidelines. Present the final AR application to stakeholders and showcase its capabilities.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Benefits of Participation:</h2>
          <ul className="list-disc list-inside">
            <li>Hands-on Experience: Gain practical experience in developing cutting-edge AR applications and working with the latest AR technologies and tools.</li>
            <li>Portfolio Enhancement: Add a unique and innovative project to your portfolio that demonstrates your proficiency in AR development and design.</li>
            <li>Collaborative Learning: Collaborate with talented individuals from diverse backgrounds, share knowledge, and learn new skills in a collaborative environment.</li>
            <li>Industry-Relevant Skills: Acquire skills and expertise that are in high demand in industries such as gaming, education, healthcare, retail, and marketing.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Nice-to-have:</h2>
          <ul className="list-disc list-inside">
            <li>Timezone: CET (+/- 3 hours)</li>
            <li>Azure certifications in Cloud development and architecture would be a plus.</li>
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
}

export default ProjectDetail;
