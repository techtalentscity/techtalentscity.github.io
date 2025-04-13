import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();
    
    return (
      <div 
        className="border border-[#EFF1F3] p-4 rounded-lg bg-white cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => navigate(project.link)} // 🔥 dynamic linking here
      >
        <div className="flex flex-col md:flex-row justify-between gap-5">    
            <div className="flex items-center mb-2 gap-1 md:gap-0">
                <img src={project.logo} alt="Company Logo" className="h-20 w-20 object-contain object-center mr-2" />
                <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="mt-2 text-[#737373] text-sm">
                      <span className='font-medium'>Skills Required:</span> {project.skills.join(', ')}
                    </p>
                </div>
            </div>
            <div>
                <p className="mb-4 text-[#394047]">Full-Time / Remote</p>
                <div className="flex justify-between items-center gap-3">
                    {project.premium ? (
                      <span className="text-primary font-bold bg-[#F3F3FF] py-1 px-3 rounded-lg">Premium</span>
                    ) : (
                      <span className="text-green-600 font-bold bg-green-50 py-1 px-3 rounded-lg">Free</span> // 🔥 show Free
                    )}
                    <span className="text-[#D72911] font-bold">{project.price}</span>
                </div>
            </div>
        </div>
      </div>
    );
};

export default ProjectCard;
