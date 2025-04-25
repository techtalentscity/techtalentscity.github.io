import Hero from "./Hero";
import HireTalent from "./HireTalent";
import HomeProjects from "./HomeProjects";
import TechBadges from "./TechBadges";
import Testimonials from "./Testimonial";
import TechPathNavigator from "./Home/TechPathNavigator"; // ✅ Corrected import path

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeProjects />
      <TechBadges />
      <TechPathNavigator /> {/* ✅ Correctly included */}
      <Testimonials />
    </div>
  );
};

export default Home;
