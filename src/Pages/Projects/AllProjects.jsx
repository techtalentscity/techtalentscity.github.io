import { Button } from "antd"
import ProjectCard from "../../components/ProjectCard"

const AllProjects = ({projects}) => {
  return (
    <div className="w-full">
        <div className="space-y-4">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>

        {/* 
        <div className="flex justify-center mt-8">
            <Button ghost className="!text-[#737373] !border-[#737373] py-5 px-12 font-bold">
              Load more
            </Button>
        </div> 
        */}
    </div>
  )
}

export default AllProjects
