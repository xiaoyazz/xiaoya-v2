import React from "react";
import { FaExternalLinkAlt, FaGithub, FaExternalLinkSquareAlt } from "react-icons/fa";
import { FaLink, FaRegFolderOpen } from "react-icons/fa6";
import { GoLinkExternal } from "react-icons/go";
import { AiOutlineFolder } from "react-icons/ai";
import SmartFood from "../assets/SmartFood.png"
import GEM from "../assets/GEM.png"
import Feedback from "../assets/feedbackApp.png"
import QuizApp from "../assets/quiz.jpeg"
import WeatherApp from "../assets/WeatherApp.png"
import Deco1 from "../assets/deco1.png"
import { useParams, Link } from "react-router-dom";

const projects = [
    {
        title: "Smart Food",
        description:
            "An iOS mobile app allowing users to manage food in their fridge. Users can view, add, edit, and delete food item, and enable/disable expiry notification.",
        image: SmartFood,
        liveLink: "https://github.com/xiaoyazz/Smart-Food",
        repoLink: "https://github.com/xiaoyazz/Smart-Food"
    },
    {
        title: "Workout G.E.M.",
        description:
            "An Android mobile app designed to support individuals in their fitness by tracking their workout.",
        image: GEM,
        liveLink: "#",
        repoLink: "#"
    },
    {
        title: "Feedback",
        description:
            "A React web app to collect user feedback and service ratings. Use JSON server as backend.",
        image: Feedback,
        liveLink: "#",
        repoLink: "#"
    },
    {
        title: "My Quiz App",
        description:
            "Allow user to take quizzes with the multiple categories. Developped with JavaScript, HTML, CSS, and open quiz API",
        image: QuizApp,
        liveLink: "https://xiaoyazz.github.io/Quiz/",
        repoLink: "https://github.com/xiaoyazz/Quiz"
    },
    {
        title: "My Weather",
        description:
            "Provide location, weather, humidity, wind, pressure, and a 5-day weather forecast. Integrated with Location API and Weather API.",
        image: WeatherApp,
        liveLink: "https://xiaoyazz.github.io/Weather-Application/",
        repoLink: "https://github.com/xiaoyazz/Weather-Application?tab=readme-ov-file"
    }
];

const Projects = () => {
    return (
        <div className="relative max-w-4xl mx-auto mt-20 pt-8 mb-10 pb-8 px-6 text-left rounded-md shadow-md text-left bg-[#e2c7a7] dark:bg-opacity-5 dark:shadow-gray-950">

            {/* <div className="absolute -top-25 left-[-22%] transform -rotate-[36deg] translate-x-1/5 z-[-0.9]">
                <img
                    src={Deco1}
                    alt="Decorative Element 1"
                    className="w-48 md:w-54 lg:w-80"
                />
            </div> */}

            <h2 className="text-2xl font-bold mt-4 mb-6 dark:text-[#3bba9c]">Projects</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="relative shadow-md rounded-md bg-[#f7f7ed] bg-opacity-90 hover:bg-opacity-100 hover:shadow-lg p-4 transform transition duration-300 hover:-translate-y-2 flex flex-col  dark:bg-white dark:bg-opacity-5 dark:hover:bg-opacity-10 dark:shadow-gray-950"
                    >
                        {/* Image */}
                        <img
                            src={project.image}
                            alt={project.title}
                            className="rounded-lg w-full h-50 object-cover mb-4"
                        />

                        {/* Project title */}
                        <h3 className="text-lg font-semibold mt-2 mb-2">{project.title}</h3>

                        {/* Description */}
                        <p className="text-sm mb-4" style={{
                            overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", textOverflow: "ellipsis"
                        }}>
                            {project.description}
                        </p>

                        {/* Bottom Section */}
                        <div className="flex justify-between items-center mt-4 mb-4">
                            <a href="#" className="text-sm font-semibold hover:text-[#9c505a] underline dark:hover:text-[#3bba9c]">
                                Read More
                            </a>
                            {/* <div className="flex gap-3">
                                <a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl hover:text-[#dd8ea4]"
                                >
                                    <FaGithub />
                                </a>
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl hover:text-[#dd8ea4]"
                                >
                                    <FaExternalLinkAlt />
                                </a>
                            </div> */}
                        </div>
                    </div>

                ))}
            </div>
            <Link
                to="/projects"
                className="font-semibold underline hover:text-[#9c505a] mt-8 px-1 block"
            >
                More Projects
            </Link>

        </div>
    );
};

export default Projects;
