import { FaAngleRight } from 'react-icons/fa';

const AboutSection = () => {
    return (

        <div className="text-left mt-10 mb-16 pt-8 pb-8 px-10 max-w-4xl mx-auto shadow-md rounded-md bg-[#d6c1cb] bg-opacity-50 dark:bg-[#4b4b4b] dark:bg-opacity-50 dark:shadow-gray-950">
            <h2 className="text-2xl font-bold mb-4 dark:text-[#3bba9c]">About me</h2>
            <p className="mb-8">
                I am currently a third-year Computer Science student.
                I'm passionate about full-stack development, mobile computing, and AI.
                Outside of school and work, I like camping, cycling, snowboarding, and video games.
            </p>

            <div>
                <h3 className="text-lg font-semibold mb-2">Here are some technologies I have been working with:</h3>
                <ul className="grid grid-cols-2 gap-4">
                    {[
                        "iOS Development / Swift / Objective-C",
                        "Android Development / Kotlin",
                        "Unity",
                        "TypeScript",
                        "Node.js & React & Angular",
                        "JavaScript ES6+",
                        "Machine Learning & EDA",
                        "Java & SpringBoot",
                        "C# & .NET",
                        "C & C++",
                        "Firebase",
                        "MongoDB",
                        "SQL & NoSql & MySql",
                        "AWS & Azure & IBM Cloud & Render",
                        "Git",
                    ].map((tech, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-2 cursor-crosshair transform transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover-text-shadow hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
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
