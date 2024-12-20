import Hero from "./Hero";
import HireTalent from "./HireTalent";
import HomeProjects from "./HomeProjects";
import TechBadges from "./TechBadges";
import Events from "./event"; // Correct import for the Events component
import Testimonials from "./Testimonial";


const Home = () => {
  return (
    <div>
        <Hero />
        <HomeProjects />
        <TechBadges />
        <Events /> {/* Correctly used Events component */}
        <Testimonials />
    </div>
  );
};

export default Home;
