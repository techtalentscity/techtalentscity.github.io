import { Button, Input } from "antd"
import UserCard from "./UserCard"
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineAdjustments } from "react-icons/hi";


const users = [
    {
      name: 'Aisha Abdullahi',
      role: 'TechPro Expert',
      imageUrl: '/images/aisha.jpg',
      badge: 'TechPro',
      slug: 'aisha-abdullahi',
    },
    {
      name: 'Emeka Nwosu',
      role: 'TechArch Expert',
      imageUrl: '/images/emeka.jpg',
      badge: 'TechArch',
      slug: 'emeka-nwosu',
    },
    // Add more user data here
  ];


const Recruit = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <Input placeholder="Search techtalents by their badge" prefix={<AiOutlineSearch />} className="w-80 p-2"/>
        <div className="flex gap-2 items-center">
          <Button icon={<HiOutlineAdjustments />} type="primary" ghost className="!h-auto !text-[#A2A2A2] !border-[#A2A2A2] py-2 px-4">Filter</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {users.map((user, index) => (
          <UserCard user={user} key={index}/>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          size="large"
          className="text-xs px-16 py-5"
        >
          Load More
        </Button>
      </div>
    </div>
  )
}

export default Recruit