import Container from "../../components/Container"
import PostAProject from "./PostAProject";
import RecentProjects from "./RecentProjects";
import amazon from '../../assets/images/amazon.png';
import microsoft from '../../assets/images/microsoft.png';

const HomeProjects = () => {

    const projects = [
        {
          title: 'Augmented Reality (AR) Application Development',
          skills: ['AR Developers', '3D Animators', 'UI Designer', 'Full Stack Developer'],
          logo: amazon,
          verified: true,
          premium: true,
          price: '$500',
        },
        {
          title: 'SmartCity Integration System',
          skills: ['Full-stack Developers', 'IoT Specialists', 'Data Scientists', 'Cloud Architects'],
          logo: microsoft,
          verified: false,
          premium: false,
          price: 'Free',
        },
        {
          title: 'Augmented Reality (AR) Application Development',
          skills: ['AR Developers', '3D Animators', 'UI Designer', 'Full Stack Developer'],
          logo: amazon,
          verified: true,
          premium: true,
          price: '$500',
        },
        {
          title: 'SmartCity Integration System',
          skills: ['Full-stack Developers', 'IoT Specialists', 'Data Scientists', 'Cloud Architects'],
          logo: microsoft,
          verified: false,
          premium: false,
          price: 'Free',
        },
        // Add more project objects as needed
      ];
  return (
    <Container className="flex flex-col-reverse lg:flex-row lg:items-start md:p-4 space-y-4 lg:space-y-0 lg:space-x-8 my-10 lg:my-[60px]">
        <div className="lg:flex-grow">
            <RecentProjects projects={projects} />
        </div>
        <div className="lg:w-1/4 flex-shrink-0 !mb-8">
            <PostAProject />
        </div>
    </Container>
  )
}

export default HomeProjects