import { FaArrowDown } from "react-icons/fa";
import villagerMe from "../../assets/villagerMe.png";
import FadeInSection from "../ui/FadeInSection";

const LandingSection = () => (
  <section
    id="home"
    className="min-h-[82vh] flex items-center scroll-mt-24"
  >
    <div className="w-full grid md:grid-cols-[180px_minmax(0,1fr)] gap-8 md:gap-12 items-start">

      {/* Avatar */}
      <FadeInSection className="flex justify-center md:pt-16">
        <div className="relative w-30 h-30 md:w-36 md:h-36">

          {/* Pink square */}
          <div className="absolute inset-0 rounded-3xl bg-[#efd2da] dark:bg-[#2f806d]/25" />

          {/* Position avatar separately so bounce does not affect centering */}
          <div className="absolute inset-0 flex items-center justify-center translate-y-3">
            <img
              src={villagerMe}
              alt="Xiaoya's avatar"
              className="w-[100%] max-w-none animate-bounce"
            />
          </div>
        </div>
      </FadeInSection>

      {/* Hero text */}
      <FadeInSection delay={80}>
        <p className="eyebrow mb-4">
          software developer · applied AI enthusiast · curious tinkerer
        </p>

        <h1 className="hero-title">
          Hi, I&apos;m{" "}
          <span className="accent-text">Xiaoya</span>.
        </h1>

        <p className="hero-subtitle mt-5 max-w-2xl">
          I build thoughtful software across web, mobile, cloud, and applied AI.
        </p>

        <a
          href="#about"
          className="inline-flex items-center gap-2 mt-9 text-link text-sm font-medium"
        >
          explore my work
          <FaArrowDown className="text-xs" />
        </a>
      </FadeInSection>
    </div>
  </section>
);

export default LandingSection;