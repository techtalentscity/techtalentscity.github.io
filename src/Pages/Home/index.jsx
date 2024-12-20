import Hero from "./Hero"
import HireTalent from "./HireTalent"
import HomeProjects from "./HomeProjects"
import TechBadges from "./TechBadges"
import event from "./event
// import TechExcellenceSection from "./TechExcellence"
import Testimonials from "./Testimonial"

const Home = () => {
  return (
    <div>
        <Hero />
        <HomeProjects />
        {/* <HireTalent /> */}
        {/* <TechExcellenceSection /> */}
        <TechBadges />
        <Testimonials />
    </div>
  )
}

export default Home
