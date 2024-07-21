import { NavLink } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import LOGO from "../../../assets/images/logo-white.png"; // Adjust the path accordingly
import { HiOutlineBriefcase, HiOutlineCpuChip, HiOutlineDocumentCheck } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';
import { LiaHeadsetSolid } from 'react-icons/lia';
import { PiVaultLight } from 'react-icons/pi';

const Sidenav = ({ open, toggleSidebar }) => {

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 912) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`!h-screen ease-in-out ${
        open ? "w-72 md:w-64 lg:w-64" : "hidden lg:block w-16"
      } bg-[#101010] relative z-50`}
    >
      <div className='flex justify-center items-center pt-9'>
        <div className='flex flex-col items-center p-3'>
          <img
            src={LOGO}
            alt='logo'
            className={`w-[90%] ${!open && "hidden"} `}
          />
        </div>
      </div>
      <div
        className={`pt-16 flex flex-col gap-4 relative ${
          open ? "h-[80vh] overflow-y-scroll scrollbar-hide pr-10" : "h-auto pr-2"
        }`}
      >
        <NavLink
          to={"/dashboard"}
          onClick={handleNavLinkClick}
          className={({ isActive }) =>
            isActive
              ? `bg-primary/90 text-[#f2f2f2] font-bold flex items-center text-sm gap-3 p-2 py-3 rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
              : `flex items-center text-sm gap-3 font-medium p-2 hover:bg-white/10 text-[#f2f2f2] rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
          }
        >
          <div>
            <RxDashboard size={20} />
          </div>
          <h2
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
            style={{
              transitionDelay: `300ms`,
            }}
          >
            Dashboard
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
          >
            Dashboard
          </h2>
        </NavLink>
        <NavLink
          to={"/all-projects"}
          onClick={handleNavLinkClick}
          className={({ isActive }) =>
            isActive
              ? `bg-primary/90 text-[#f2f2f2] font-bold flex items-center text-sm gap-3 p-2 py-3 rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
              : `flex items-center text-sm gap-3 font-medium p-2 hover:bg-white/10 text-[#f2f2f2] rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
          }
        >
          <div>
            <HiOutlineDocumentCheck size={20} />
          </div>
          <h2
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
            style={{
              transitionDelay: `300ms`,
            }}
          >
            Projects
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
          >
            Projects
          </h2>
        </NavLink>
        <NavLink
          to={"/ttc-ai"}
          onClick={handleNavLinkClick}
          className={({ isActive }) =>
            isActive
              ? `bg-primary/90 text-[#f2f2f2] font-bold flex items-center text-sm gap-3 p-2 py-3 rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
              : `flex items-center text-sm gap-3 font-medium p-2 hover:bg-white/10 text-[#f2f2f2] rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
          }
        >
          <div>
            <HiOutlineCpuChip size={20} />
          </div>
          <h2
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
            style={{
              transitionDelay: `300ms`,
            }}
          >
            TTC AI
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
          >
            TTC AI
          </h2>
        </NavLink>
        <NavLink
          to={"/hire"}
          onClick={handleNavLinkClick}
          className={({ isActive }) =>
            isActive
              ? `bg-primary/90 text-[#f2f2f2] font-bold flex items-center text-sm gap-3 p-2 py-3 rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
              : `flex items-center text-sm gap-3 font-medium p-2 hover:bg-white/10 text-[#f2f2f2] rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
          }
        >
          <div>
            <HiOutlineBriefcase size={20} />
          </div>
          <h2
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
            style={{
              transitionDelay: `300ms`,
            }}
          >
            Hire
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
          >
            Hire
          </h2>
        </NavLink>
        <NavLink
          to={"/project-vault"}
          onClick={handleNavLinkClick}
          className={({ isActive }) =>
            isActive
              ? `bg-primary/90 text-[#f2f2f2] font-bold flex items-center text-sm gap-3 p-2 py-3 rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
              : `flex items-center text-sm gap-3 font-medium p-2 hover:bg-white/10 text-[#f2f2f2] rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
          }
        >
          <div>
            <PiVaultLight size={20} />
          </div>
          <h2
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
            style={{
              transitionDelay: `300ms`,
            }}
          >
            Project Vault
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
          >
            Project Vault
          </h2>
        </NavLink>
        <NavLink
          to={"/support"}
          onClick={handleNavLinkClick}
          className={({ isActive }) =>
            isActive
              ? `bg-primary/90 text-[#f2f2f2] font-bold flex items-center text-sm gap-3 p-2 py-3 rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
              : `flex items-center text-sm gap-3 font-medium p-2 hover:bg-white/10 text-[#f2f2f2] rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
          }
        >
          <div>
            <LiaHeadsetSolid size={20} />
          </div>
          <h2
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
            style={{
              transitionDelay: `300ms`,
            }}
          >
            Support
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
          >
            Support
          </h2>
        </NavLink>
        <NavLink
          to={"/settings"}
          onClick={handleNavLinkClick}
          className={({ isActive }) =>
            isActive
              ? `bg-primary/90 text-[#f2f2f2] font-bold flex items-center text-sm gap-3 p-2 py-3 rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
              : `flex items-center text-sm gap-3 font-medium p-2 hover:bg-white/10 text-[#f2f2f2] rounded-r-3xl ${open ? "pl-12" : "pl-4"} group`
          }
        >
          <div>
            <IoSettingsOutline size={20} />
          </div>
          <h2
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
            style={{
              transitionDelay: `300ms`,
            }}
          >
            Settings
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
          >
            Settings
          </h2>
        </NavLink>
      </div>
      <div className='absolute top-10 right-[-8px] cursor-pointer bg-primary h-6 w-6 rounded-full text-[#f2f2f2] md:hidden'>
        {open && (
          <button onClick={() => toggleSidebar()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidenav;
