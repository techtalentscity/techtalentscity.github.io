import { LuArrowLeftToLine } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import BADGE from '../../../assets/images/TechArchs.png'

const RecruitProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div
        onClick={() => navigate(-1)}
        className="text-[#101010] font-bold mb-4 flex items-center gap-2 cursor-pointer"
      >
        <LuArrowLeftToLine className="text-lg" /> 
        <span>Back</span>
      </div>

      {/* Profile Section */}
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-5">
            {/* Left Section: Profile Info */}
            <div className="flex items-center gap-4 xl:gap-8">
                <img
                    src="https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Aisha Abdullahi"
                    className="w-24 xl:w-32 h-24 xl:h-32 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-xl xl:text-3xl font-bold mb-1 xl:mb-3">Aisha Abdullahi</h1>
                    <p className="text-[#101010] xl:text-xl">TechPro Expert</p>
                </div>
            </div>
            <div className="">
                <p className="text-[#737373] mb-2 xl:mb-4">Completed Projects:</p>
                <p className="text-xl xl:text-3xl font-bold text-[#101010]">25</p>
            </div>
            <div className="bg-[#E6F4EB] rounded-lg py-4 px-8 text-center">
                <div className="flex justify-center items-center">
                    <img
                        src={BADGE} // Placeholder for badge icon
                        alt="Badge"
                        className="w-32 h-32 mb-3 object-center"
                    />
                </div>
                <p className="font-bold">TechMentor Advanced</p>
                <p className="text-gray-500">Current Badge</p>
            </div>            
        </div>

        <div className="mt-10">
            <p className="text-[#737373]">Course of study at each degree</p>
            <p className="text-2xl text-[#101010] font-bold mt-2">PhD Computer Science</p>

            <p className="text-[#737373] mt-4">Level of education degree attained</p>
            <p className="text-2xl text-[#101010] font-bold mt-2">PhD Computer Science</p>

            <p className="text-[#737373] mt-4">Interest</p>
            <p className="text-2xl text-[#101010] font-bold mt-2">AI Engineering</p>
        </div>

      {/* Hire Button */}
      <div className="flex justify-center mt-16 mb-8">
        <button className="bg-blue-500 text-white py-4 px-24 rounded-lg hover:bg-blue-600 focus:outline-none">
          Hire
        </button>
      </div>
    </div>
  );
};

export default RecruitProfile;
