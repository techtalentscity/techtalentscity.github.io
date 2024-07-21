import { AiOutlineSearch } from 'react-icons/ai'
import ProjectCard from '../../../components/ProjectCard'
import { Button, Input } from 'antd'
import { HiOutlineAdjustments } from 'react-icons/hi'

const ProjectList = ({projects}) => {
  return (
    <div>
        <div className="w-full">
            <div className="flex flex-col md:flex-row gap-5 justify-between md:items-center mb-4">
                <Input placeholder="Search for projects..." prefix={<AiOutlineSearch />} className="w-80 p-2"/>
                <div className="flex gap-2 items-center">
                  <Button icon={<HiOutlineAdjustments />} type="primary" ghost className="!h-auto !text-[#A2A2A2] !border-[#A2A2A2] py-2 px-4">Filter</Button>
                </div>
            </div>
            <div className="space-y-4">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Button ghost className="!text-[#737373] !border-[#737373] py-5 px-12 font-bold">Load more</Button>
            </div>
        </div>
    </div>
  )
}

export default ProjectList