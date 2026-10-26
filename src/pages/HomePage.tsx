import AboutSection from "../components/home/AboutSection";
import ExperienceSection from "../components/home/ExperienceSection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import LandingSection from "../components/home/LandingSection";
import useHashScroll from "../hooks/useHashScroll";
import useScrollToTop from "../hooks/useScrollToTop";

const HomePage = () => {
  useScrollToTop();
  useHashScroll();

  return (
    <main className="site-main">
      <LandingSection />
      <AboutSection />
      <ExperienceSection />
      <FeaturedProjects />
    </main>
  );
};

export default HomePage;
