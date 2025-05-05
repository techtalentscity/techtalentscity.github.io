import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import logo from '../assets/images/logo-black.png';
import { Button } from "antd";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [flip, setFlip] = useState(false);

    function handleBurger() {
        setFlip(!flip);
    }

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 41;
            setScrolled(isScrolled);
        };

        const setNavbarHeight = () => {
            const navbar = document.querySelector('.navbar');
            const height = navbar ? navbar.offsetHeight : 64;
            document.documentElement.style.setProperty('--navbar-height', `${height}px`);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', setNavbarHeight);

        // Set initial navbar height
        setNavbarHeight();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', setNavbarHeight);
        };
    }, []);

    return (
        <div className={`z-50 navbar bg-[#F2F2F2] ${scrolled ? 'fixed top-0 left-0 w-full' : 'relative'}`}>
            <Container className={'py-4 flex justify-between items-center'}>
                <Link to={'/'}>
                    <img src={logo} alt="logo" className="w-[250px]" />
                </Link>
                <div className="hidden lg:flex items-center gap-20">
                    <NavLink to={'/'} className={({ isActive }) => isActive ? "font-bold text-[#3B3CC6]" : "" }>Home</NavLink>
                    <NavLink to={'/projects'} className={({ isActive }) => isActive ? "font-bold text-[#3B3CC6]" : "" }>Projects</NavLink>
                    <NavLink to={'/about'} className={({ isActive }) => isActive ? "font-bold text-[#3B3CC6]" : "" }>About</NavLink>
                </div>
                <div className="hidden lg:flex items-center gap-2">
                    <Link to={'/signin'}>
                        <Button className="rounded-2xl py-[10px] px-8 font-bold bg-[#F3F3FF] hover:!bg-[#F3F3FF] border-0">
                            Login
                        </Button>
                    </Link>
                    <Link to={'/signup'}>
                        <Button type="primary" className="rounded-2xl py-[10px] px-8 font-bold shadow-none">Sign Up</Button>
                    </Link>
                </div>
                <div className="burger-menu lg:hidden" onClick={handleBurger}>
                    <div className="flex flex-col items-center justify-center w-[24px] h-[24px] cursor-pointer relative">
                        <div className={`${flip && "top-bar"} top w-[10px] h-[2px] bg-[#000] absolute left-0 top-[4px]`}></div>
                        <div className={`${flip && "center-bar"} center w-[20px] h-[2px] bg-[#000]`}></div>
                        <div className={`${flip && "bottom-bar"} bottom w-[10px] h-[2px] bg-[#000] absolute right-0 bottom-[4px]`}></div>
                    </div>
                </div>
                <div
                    className={`lg:hidden flex flex-col justify-between absolute top-[100%] left-0 right-0 bg-primary/90 text-white overflow-hidden z-[1000] ${
                        !flip ? "h-0" : "h-[256px]"
                    }  ease-in-out duration-500`}
                >
                    <ul className="flex flex-col lg:flex-row whitespace-nowrap lg:leading-[80px] font-medium w-full lg:w-auto uppercase">
                        <Link to={'/'} className='cursor-pointer px-2 lg:px-3 xl:px-4 py-4 lg:py-0 ml-3' onClick={() => setFlip(!flip)}>Home</Link>
                        <Link to={'/about'} className='cursor-pointer px-2 lg:px-3 xl:px-4 py-4 lg:py-0 ml-3' onClick={() => setFlip(!flip)}>About</Link>
                        <Link to={'/projects'} className='cursor-pointer px-2 lg:px-3 xl:px-4 py-4 lg:py-0 ml-3' onClick={() => setFlip(!flip)}>Projects</Link>
                    </ul>
                    <div className="text-primary font-semibold bg-[#fff] px-4 py-4 text-sm lg:text-sm grid grid-cols-2 gap-2">
                        <div className='flex justify-center items-center border-r-2'>
                            <Link to={'/signin'} onClick={() => setFlip(!flip)}>
                                Login
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link to={'/signup'} onClick={() => setFlip(!flip)}>
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;
