import Hero from "./Hero";
import HireTalent from "./HireTalent";
import HomeProjects from "./HomeProjects";
import Events from "./event"; // Correct import for the Events component
import TechBadges from "./TechBadges";
import Testimonials from "./Testimonial";


const Home = () => {
  return (
    <div>
        <Hero />
        <HomeProjects />
        <Events /> {/* Correctly used Events component */}
        <TechBadges />
        <Testimonials />
    </div>
  );
};

export default Home;
