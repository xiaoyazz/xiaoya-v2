import AboutSection from "../components/home/AboutSection";
import ExperienceSection from "../components/home/ExperienceSection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import LandingSection from "../components/home/LandingSection";
import useScrollToTop from "../hooks/useScrollToTop";

const HomePage = () => {
  useScrollToTop();

  return (
    <div className="relative">
      <LandingSection />
      <AboutSection />
      <ExperienceSection />
      <FeaturedProjects />
    </div>
  );
};

export default HomePage;
