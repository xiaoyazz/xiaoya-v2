import { Link } from "react-router-dom";
import { featuredProjects } from "../../data/projects";
import FeaturedProjectCard from "../projects/FeaturedProjectCard";
import SectionCard from "../ui/SectionCard";

const FeaturedProjects = () => (
  <SectionCard tone="tan">
    <h2 className="text-2xl font-bold mb-6 dark:text-[#3bba9c]">Projects</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {featuredProjects.map((project) => (
        <FeaturedProjectCard key={project.id} project={project} />
      ))}
    </div>
    <Link
      to="/projects"
      className="font-semibold underline hover:text-[#9c505a] dark:hover:text-[#3bba9c] mt-8 px-1 block"
    >
      More Projects
    </Link>
  </SectionCard>
);

export default FeaturedProjects;
