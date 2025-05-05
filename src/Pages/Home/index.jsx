import Hero from "./Hero";
import HireTalent from "./HireTalent";
import HomeProjects from "./HomeProjects";
import CareerTestLanding from "./CareerTestLanding"; // ✅ Updated import name
import TechPathNavigator from "./TechPathNavigator";
import TechBadges from "./TechBadges";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeProjects />
      <CareerTestLanding /> {/* ✅ Updated usage */}
      <TechPathNavigator />
      <TechBadges />
      <Testimonials />
    </div>
  );
};

export default Home;
