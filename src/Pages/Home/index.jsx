import Hero from "./Hero";
import HireTalent from "./HireTalent";
import HomeProjects from "./HomeProjects";
import TechBadges from "./TechBadges";
import Testimonials from "./Testimonial";
import Events from "./event"; // Correct import for the Events component

const Home = () => {
  return (
    <div>
        <Hero />
        <HomeProjects />
        <TechBadges />
        <Testimonials />
        <Events /> {/* Correctly used Events component */}
    </div>
  );
};

export default Home;
