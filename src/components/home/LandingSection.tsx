import villagerMe from "../../assets/villagerMe.png";

const LandingSection = () => (
  <div className="text-left mt-40 px-4 max-w-4xl mx-auto relative">
    <img
      src={villagerMe}
      alt="Xiaoya's Avatar"
      className="w-20 h-22 animate-bounce"
    />
    <h1 className="text-5xl font-bold mt-8">
      Hi, I'm <span className="text-[#dd8ea4] dark:text-[#3bba9c]">Xiaoya</span>.
    </h1>
    <h3 className="text-2xl mt-4 font-bold">
      I create, build, and explore technology.
    </h3>
  </div>
);

export default LandingSection;
