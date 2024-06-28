import { FaArrowRight } from 'react-icons/fa6';
import ProjectCard from '../../components/ProjectCard';
import { Link } from 'react-router-dom';

const RecentProjects = ({ projects }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6">Recent Projects</h2>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <Link to={'/projects'} className="mt-6 text-black font-medium flex items-center gap-2"><span>See All Projects</span> <FaArrowRight /></Link>
    </div>
  );
};

export default RecentProjects;
