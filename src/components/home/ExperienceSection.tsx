import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { experiences } from "../../data/siteData";
import FadeInSection from "../ui/FadeInSection";
import SectionHeading from "../ui/SectionHeading";

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExperience = experiences[activeIndex];

  return (
    <section id="experience" className="portfolio-section scroll-mt-24">
      <FadeInSection>
        <SectionHeading>experience</SectionHeading>
      </FadeInSection>

      <FadeInSection delay={70}>
        <div className="experience-layout">
          <div className="experience-tabs" role="tablist" aria-label="Work experience">
            {experiences.map((experience, index) => (
              <button
                key={`${experience.company}-${experience.date}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className={`experience-tab text-hover ${activeIndex === index ? "is-active" : ""}`}
              >
                {experience.company.replace("Sheridan College Centre for Applied AI (CAAI) + TELUS", "CAAI + TELUS")}
              </button>
            ))}
          </div>

          <article className="experience-panel" role="tabpanel">
            <p className="eyebrow mb-2">{activeExperience.date}</p>
            <h3 className="text-xl md:text-2xl font-semibold leading-snug">
              {activeExperience.title}
              <span className="accent-text"> @ {activeExperience.company}</span>
            </h3>
            <p className="text-sm mt-2 mb-7 text-black/50 dark:text-white/50">
              {activeExperience.location}
            </p>

            <ul className="space-y-4">
              {activeExperience.details.map((detail) => (
                <li key={detail} className="experience-detail">
                  <FaAngleRight className="text-[#c57f92] dark:text-[#3bba9c] shrink-0 mt-1" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </FadeInSection>
    </section>
  );
};

export default ExperienceSection;
