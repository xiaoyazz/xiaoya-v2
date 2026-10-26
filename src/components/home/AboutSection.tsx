import { FaAngleRight } from "react-icons/fa";
import { about } from "../../data/siteData";
import FadeInSection from "../ui/FadeInSection";
import SectionHeading from "../ui/SectionHeading";

const AboutSection = () => (
  <section id="about" className="portfolio-section scroll-mt-24">
    <FadeInSection>
      <SectionHeading>about</SectionHeading>
    </FadeInSection>

    <div className="grid md:grid-cols-[1.05fr_.95fr] gap-10 md:gap-14">
      <FadeInSection delay={60}>
        <p className="text-[15px] md:text-base leading-8 text-black/70 dark:text-white/70">
          {about.description}
        </p>
      </FadeInSection>

      <FadeInSection delay={120}>
        <p className="eyebrow mb-5">technologies I work with</p>
        <ul className="grid sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-3">
          {about.technologies.map((tech) => (
            <li key={tech} className="tech-item text-hover">
              <FaAngleRight className="text-[#c57f92] dark:text-[#3bba9c] shrink-0" />
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </FadeInSection>
    </div>
  </section>
);

export default AboutSection;
