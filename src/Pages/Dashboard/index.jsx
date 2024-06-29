// import { message } from "antd";
// import Cookies from "js-cookie";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
// import startLogoutTimer from "../utils/startLogoutTimer";
// import { logout } from "../redux/slice/userSlice";
import Sidenav from "./components/Sidenav";
import Topnav from "./components/Topnav";

const Dashboard = () => {

    // const { user } = useSelector(state => state.user)
    const [open, setOpen] = useState(true);
    const [overlayVisible, setOverlayVisible] = useState(true)


    // const navigate = useNavigate()
    // const dispatch = useDispatch()

    // const inactivityDuration = 1800000; // Specify the inactivity duration (e.g., 5 minutes = 300000 milliseconds)

    // const logoutHandle = useRef(() => {
    //     message.info("Logged out, There was no activity going on");
    //     dispatch(logout());
    //     navigate('/login')
    // })

    // useEffect(() => {
    //     const cleanup = startLogoutTimer(logoutHandle.current, inactivityDuration);
    //     return cleanup;
    // }, [inactivityDuration]);

    // useEffect(() => {
    //     if (Cookies.get('jwt') && (!user)) {
    //         navigate('/verify-your-mail')
    //     }else if (!Cookies.get('jwt') && (!user)) {
    //         navigate('/login')
    //     }
    
    // }, [navigate, user])

    const toggleSidebar = () => {
        setOpen(!open);
        setOverlayVisible(!overlayVisible);
    };

  return (
    <div className="w-full flex bg-[#ffffff] text-[#1E1E1E] h-screen">
        
        <Sidenav open={open} toggleSidebar={toggleSidebar} />
        {overlayVisible && <div className="overlay fixed inset-0 bg-purple-100/30 z-20 lg:hidden" onClick={toggleSidebar}></div>}
        <div className={`absolute top-0 ${open ? 'left-0 lg:left-64' : 'left-0 lg:left-16'}  right-0 bottom-0 overflow-auto`}>
            <Topnav open={open} toggleSidebar={toggleSidebar} />
            <div className='p-2 md:p-3 lg:p-5'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard