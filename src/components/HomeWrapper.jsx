import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const HomeWrapper = () => {
  return (
    <div>
        <Navbar />
        {<Outlet />}
        <Footer />
    </div>
  )
}

export default HomeWrapper