import Hero from "./Hero";
import HireTalent from "./HireTalent";
import HomeProjects from "./HomeProjects";
import TechBadges from "./TechBadges";
import Testimonials from "./Testimonial";
import TechPathNavigator from "./TechPathNavigator"; // Importing the new component

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeProjects />
      <TechBadges />
      <TechPathNavigator /> {/* Adding it to the page structure */}
      <Testimonials />
    </div>
  );
};

export default Home;
