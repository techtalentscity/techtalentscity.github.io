import Container from "./Container"
import logo from '../assets/images/logo-black.png'
import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaXTwitter } from "react-icons/fa6"

const Footer = () => {

    const currentYear = new Date().getFullYear();
  return (
    <div className="bg-white">
        <Container className={'pt-32 pb-10'}>
            <div className="grid lg:grid-cols-4 gap-16">
                <Link to={'/'} className="col-span-2">
                    <img src={logo} alt="logo" className="w-[250px]" />
                </Link>
                <ul className="text-[#101010]">
                    <li className="mb-2"><Link to={'/'}>Home</Link></li>
                    <li className="mb-2"><Link to={'/contact'}>Contact</Link></li>
                    <li className="mb-2"><Link to={'/about'}>About</Link></li>
                </ul>
                <ul className="text-[#101010]">
                    <li className="mb-2"><Link to={'/'}>Support</Link></li>
                    <li className="mb-2"><Link to={'/contact'}>Privacy Policy</Link></li>
                    <li className="mb-2"><Link to={'/about'}>Terms of Service</Link></li>
                </ul>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center border-t py-6 mt-3 gap-5">
                <div className="flex gap-4 items-center text-black">
                    <FaFacebook size={17} />
                    <FaXTwitter size={17} />
                    <FaInstagram size={17} />
                    <FaLinkedin size={17} />
                    <FaPinterest size={17} />
                </div>
                <p className="text-sm">© {currentYear} All rights reserved</p>
            </div>
        </Container>
    </div>
  )
}

export default Footer