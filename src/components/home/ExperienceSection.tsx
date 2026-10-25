import { FaAngleRight } from "react-icons/fa";
import { experiences } from "../../data/siteData";
import SectionCard from "../ui/SectionCard";

const ExperienceSection = () => (
  <SectionCard tone="white">
    <h2 className="text-2xl font-bold mb-6 dark:text-[#3bba9c]">Experience</h2>

    <div className="space-y-8">
      {experiences.map((experience) => (
        <article key={`${experience.company}-${experience.date}`}>
          <h3 className="text-lg font-semibold">
            {experience.title} @{" "}
            <span className="dark:text-[#3bba9c]">{experience.company}</span>
          </h3>
          <p className="text-sm mb-4">
            {experience.date} - {experience.location}
          </p>
          <ul className="space-y-2">
            {experience.details.map((detail) => (
              <li
                key={detail}
                className="flex items-center gap-2 cursor-crosshair transform transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:text-[#9c505a] hover-text-shadow dark:hover:text-[#3bba9c]"
              >
                <FaAngleRight className="shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </SectionCard>
);

export default ExperienceSection;
