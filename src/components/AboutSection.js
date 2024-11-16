import { FaAngleRight } from 'react-icons/fa';

const AboutSection = () => {
    return (

        <div className="text-left mt-10 mb-6 pt-8 pb-8 px-4 max-w-4xl mx-auto shadow-sm bg-white bg-opacity-40">
            <h2 className="text-2xl font-bold mb-4">About me</h2>
            <p className="mb-8">
                I am currently a third-year Computer Science student.
                I'm passionate about full-stack development, mobile computing, and AI.
                Outside of school and work, I like camping, cycling, snowboarding, and video games.
            </p>

            <div>
                <h3 className="text-lg font-semibold mb-2">Here are some technologies I have been working with:</h3>
                <ul className="grid grid-cols-2 gap-4">
                    {[
                        "iOS in Swift",
                        "Android in Kotlin",
                        "TypeScript",
                        "React & Angular",
                        "JavaScript ES6+",
                        "Python & Jupyter Notebook",
                        "Java",
                        "C# & .NET",
                        "C & C++",
                        "Firebase",
                        "MongoDB",
                        "SQL",
                        "AWS & Azure & IBM Cloud",
                        "Git",
                    ].map((tech, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-2 cursor-crosshair transform transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover-text-shadow hover:text-indigo-500"
                        >
                            <FaAngleRight />
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>
            {/* <hr className="border-t my-4 mt-12" /> */}
        </div>
    );
};

export default AboutSection;
