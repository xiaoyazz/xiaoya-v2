import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { featuredProjects } from "../../data/projects";
import FeaturedProjectCard from "../projects/FeaturedProjectCard";
import FadeInSection from "../ui/FadeInSection";
import SectionHeading from "../ui/SectionHeading";

const FeaturedProjects = () => (
  <section id="work" className="portfolio-section scroll-mt-24">
    <FadeInSection>
      <SectionHeading>selected work</SectionHeading>
    </FadeInSection>

    <div className="space-y-20 md:space-y-28">
      {featuredProjects.slice(0, 3).map((project, index) => (
        <FadeInSection key={project.id} delay={index * 50}>
          <FeaturedProjectCard project={project} index={index} />
        </FadeInSection>
      ))}
    </div>

    <FadeInSection delay={80} className="mt-14">
      <Link to="/projects" className="text-link inline-flex items-center gap-2 font-medium">
        see all projects <FaArrowRight className="text-xs" />
      </Link>
    </FadeInSection>
  </section>
);

export default FeaturedProjects;
