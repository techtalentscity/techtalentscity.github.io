import Hero from "./Hero";
import HireTalent from "./HireTalent";
import HomeProjects from "./HomeProjects";
import TechBadges from "./TechBadges";
import Events from "./Event"; // Correct import of Events component
// import TechExcellenceSection from "./TechExcellence";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div>
        <Hero />
        <Events /> {/* Correct usage of the Events component */}
        <HomeProjects />
        {/* <HireTalent /> */}
        {/* <TechExcellenceSection /> */}
        <TechBadges />
        <Testimonials />
    </div>
  );
};

export default Home;
