import { Badge } from "antd";
import { useState } from "react";
import { BsChatText } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../redux/slice/userSlice";
// import AVATAR from "../assets/images/avatar.png";

const routeNames = {
  '/dashboard': 'Dashboard',
  '/all-projects': 'Projects',
  '/ttc-ai': 'TTC AI',
  '/hire': 'Hire',
  '/project-vault': 'Project Vault',
  '/support': 'Support',
  '/settings': 'Settings',
  '/settings/reset-password': 'Settings > Reset Password',
  '/settings/edit-profile': 'Settings > Edit Profile',
};

const Topnav = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const currentRouteName = routeNames[location.pathname] || null;

  // const { user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // const logoutHandler = async () => {
  //   try {
  //     dispatch(logout());
  //     navigate("/login");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='w-full bg-white border-gray-200 sticky top-0 z-10 border-b border-black/5'>
      <div className={`w-[95%] h-16 mx-auto flex justify-between items-center`}>
        <div className={`flex gap-3 items-center ml-[-10px]`}>
          <HiMenuAlt3
            size={28}
            className='cursor-pointer text-dark-primary dark:text-light-primary'
            onClick={() => toggleSidebar()}
          />
        <p className="text-[#000606] text-base md:text-xl font-bold">{currentRouteName}</p>
        </div>
        <div className={`flex gap-4 justify-center items-center`}>
          <div className="w-8 md:w-12 h-8 md:h-12 bg-[#F3F3FF] rounded-full p-3 flex items-center justify-center">
            <Badge dot={true}>
              <BsChatText size={18} />
            </Badge>
          </div>
          <div className="w-8 md:w-12 h-8 md:h-12 bg-[#F3F3FF] rounded-full p-3 flex items-center justify-center">
            <Badge dot={true}>
              <HiOutlineBell size={18} />
            </Badge>
          </div>
          <div className='relative'>
            <button
              onClick={toggleDropdown}
              className='flex items-center gap-2 focus:outline-none'
            >
              {/* <img
                src={AVATAR}
                alt='user'
                className='w-8 h-8 rounded-full object-cover'
              /> */}
              <div className="flex flex-col gap-1 items-start">
                <h2 className='font-medium capitalize'>John</h2>
                <p className="text-xs">Tech Pro</p>
              </div>
              {dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {dropdownOpen && (
              <div className='z-10 absolute top-12 right-0 mt-2 w-40 bg-white dark:bg-dark-primary border border-gray-200 dark:border-gray-700 rounded shadow-md'>
                <span
                  className='flex gap-2 items-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                  // onClick={logoutHandler}
                >
                  <IoIosLogOut size={18} />
                  <span>Logout</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
