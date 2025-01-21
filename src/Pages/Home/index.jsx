import Hero from "./Hero";
import HireTalent from "./HireTalent";
import HomeProjects from "./HomeProjects";
import TechBadges from "./TechBadges";
import Testimonials from "./Testimonial";


const Home = () => {
  return (
    <div>
        <Hero />
        <HomeProjects />
        <TechBadges />
        <Testimonials />
    </div>
  );
};

export default Home;
