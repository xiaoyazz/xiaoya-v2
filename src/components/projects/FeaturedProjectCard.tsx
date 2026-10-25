import { Link } from "react-router-dom";
import type { Project } from "../../types/content";

interface FeaturedProjectCardProps {
  project: Project;
}

const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => (
  <article className="scroll-reactive-card relative shadow-md rounded-md bg-[#f7f7ed] bg-opacity-90 hover:bg-opacity-100 hover:shadow-lg p-4 transform transition duration-300 hover:-translate-y-2 flex flex-col dark:bg-white dark:bg-opacity-10 dark:hover:bg-opacity-15 dark:shadow-gray-950">
    <img
      src={project.coverImage}
      alt={project.title}
      className="rounded-lg w-full h-50 object-cover mb-4"
    />
    <h3 className="text-lg font-semibold mt-2 mb-2">{project.title}</h3>
    <p className="text-sm mb-4 line-clamp-3">{project.summary}</p>
    <div className="flex justify-between items-center mt-4 mb-4">
      <Link
        to={`/projects/${project.id}`}
        className="text-sm font-semibold hover:text-[#9c505a] underline dark:hover:text-[#3bba9c]"
      >
        Read More
      </Link>
    </div>
  </article>
);

export default FeaturedProjectCard;
