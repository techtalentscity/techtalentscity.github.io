import Hero from "./Hero";
import HireTalent from "./HireTalent";
import HomeProjects from "./HomeProjects";
import CareerTest from "./CareerTest"; // ✅ New import added
import TechPathNavigator from "./TechPathNavigator";
import TechBadges from "./TechBadges";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeProjects />
      <CareerTest /> {/* ✅ Insert CareerTest here after HomeProjects */}
      <TechPathNavigator />
      <TechBadges />
      <Testimonials />
    </div>
  );
};

export default Home;
