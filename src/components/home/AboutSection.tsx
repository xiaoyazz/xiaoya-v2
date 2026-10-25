import { FaAngleRight } from "react-icons/fa";
import { about } from "../../data/siteData";
import SectionCard from "../ui/SectionCard";

const AboutSection = () => (
  <SectionCard tone="rose">
    <h2 className="text-2xl font-bold mb-4 dark:text-[#3bba9c]">About me</h2>
    <p className="mb-8">{about.description}</p>

    <div>
      <h3 className="text-lg font-semibold mb-2">
        Here are some technologies I have been working with:
      </h3>
      <ul className="grid grid-cols-2 gap-4">
        {about.technologies.map((tech) => (
          <li
            key={tech}
            className="flex items-center gap-2 cursor-crosshair transform transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover-text-shadow hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
          >
            <FaAngleRight />
            {tech}
          </li>
        ))}
      </ul>
    </div>
  </SectionCard>
);

export default AboutSection;
