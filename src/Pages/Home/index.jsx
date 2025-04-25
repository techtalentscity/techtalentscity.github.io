import Hero from "./Hero";
import HireTalent from "./HireTalent";
import HomeProjects from "./HomeProjects";
import TechPathNavigator from "./TechPathNavigator"; // ✅ Moved above TechBadges
import TechBadges from "./TechBadges";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeProjects />
      <TechPathNavigator /> {/* ✅ TechPathNavigator comes BEFORE TechBadges */}
      <TechBadges />
      <Testimonials />
    </div>
  );
};

export default Home;
