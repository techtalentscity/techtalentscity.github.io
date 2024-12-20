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
                    <li className="mb-2"><Link to={'/projects'}>Projects</Link></li>
                    <li className="mb-2"><Link to={'/about'}>About</Link></li>
                </ul>
                <ul className="text-[#101010]">
                    <li className="mb-2">Support</li>
                    <li className="mb-2">Privacy Policy</li>
                    <li className="mb-2">Terms of Service</li>
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
                <p className="text-xs text-black font-sans font-medium">
                  © {currentYear} <a href="https://www.techtalentscity.com/" className="text-black hover:underline" target="_blank" rel="noopener noreferrer">TechTalents City</a>. 
               Powered by <a href="https://www.favoredonline.com/" className="text-black hover:underline" target="_blank" rel="noopener noreferrer">Favored Online Inc.</a>
                </p>
            </div>
        </Container>
    </div>
  )
}

export default Footer
