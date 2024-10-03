import { Button } from 'antd';
import techtalent from '../../../assets/images/techtalent.png';
import PostAProject from "../../Home/PostAProject";
import ProjectList from "./ProjectList";
import { useState } from 'react';


const projects = [
    {
      title: 'Augmented Reality (AR) Application Development',
      skills: ['AR Developers', '3D Animators', 'UI Designer', 'Full Stack Developer'],
      logo: techtalent,
      verified: true,
      premium: true,
      price: '$500',
    },
    {
      title: 'SmartCity Integration System',
      skills: ['Full-stack Developers', 'IoT Specialists', 'Data Scientists', 'Cloud Architects'],
      logo: techtalent,
      verified: false,
      premium: false,
      price: 'Free',
    },
    {
      title: 'Augmented Reality (AR) Application Development',
      skills: ['AR Developers', '3D Animators', 'UI Designer', 'Full Stack Developer'],
      logo: techtalent,
      verified: true,
      premium: true,
      price: '$500',
    },
    {
      title: 'SmartCity Integration System',
      skills: ['Full-stack Developers', 'IoT Specialists', 'Data Scientists', 'Cloud Architects'],
      logo: techtalent,
      verified: false,
      premium: false,
      price: 'Free',
    },
    // Add more project objects as needed
  ];
const AllProjects = () => {

    const [currentView, setCurrentView] = useState('All')
  return (
    <div>
        <div className="overflow-y-scroll scrollbar-hide gap-6 py-2 px-2" style={{ display: 'flex' }}>
            <Button
              onClick={() => setCurrentView('All')}
              type={currentView === `All` ? 'primary' : 'default'}
              className={`!shadow-none rounded-3xl font-medium py-2 px-4 !h-auto text-lg ${currentView !== `All` && '!border-none bg-[#F3F3FF] text-[#101010] hover:!bg-[#F3F3FF]'}`}
            >
              All
            </Button>
            <Button
              onClick={() => setCurrentView('Ongoing')}
              type={currentView === `Ongoing` ? 'primary' : 'default'}
              className={`!shadow-none rounded-3xl font-medium py-2 px-6 !h-auto text-lg ${currentView !== `Ongoing` && '!border-none bg-[#F3F3FF] text-[#101010] hover:!bg-[#F3F3FF]'}`}
            >
              Ongoing
            </Button>
            <Button
              onClick={() => setCurrentView('Completed')}
              type={currentView === `Completed` ? 'primary' : 'default'}
              className={`!shadow-none rounded-3xl font-medium py-2 px-6 !h-auto text-lg ${currentView !== `Completed` && '!border-none bg-[#F3F3FF] text-[#101010] hover:!bg-[#F3F3FF]'}`}
            >
              Completed
            </Button>
            {/* <Button
              onClick={() => setCurrentView('Recommended projects')}
              type={currentView === `Recommended projects` ? 'primary' : 'default'}
              className={`!shadow-none rounded-3xl font-medium py-2 px-6 !h-auto text-lg ${currentView !== `Recommended projects` && '!border-none bg-[#F3F3FF] text-[#101010] hover:!bg-[#F3F3FF]'}`}
            >
              Recommended projects
            </Button>
            <Button
              onClick={() => setCurrentView('Recommended collaborators')}
              type={currentView === `Recommended collaborators` ? 'primary' : 'default'}
              className={`!shadow-none rounded-3xl font-medium py-2 px-6 !h-auto text-lg ${currentView !== `Recommended collaborators` && '!border-none bg-[#F3F3FF] text-[#101010] hover:!bg-[#F3F3FF]'}`}
            >
              Recommended collaborators
            </Button> */}
        </div>
        <div className="flex flex-col lg:flex-row lg:items-start md:p-4 space-y-4 lg:space-y-0 lg:space-x-8 mt-8 md:mt-4">
            <div className="lg:flex-grow">
                <ProjectList projects={projects} />
            </div>
            <div className="lg:w-1/4 flex-shrink-0 !mb-8">
                <PostAProject />
            </div>
        </div>
    </div>
  )
}

export default AllProjects