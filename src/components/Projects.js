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
import projectOverview from "../data/projectOverview.json";

const Projects = () => {
    return (
        <div className="text-left mt-10 mb-16 pt-8 pb-8 px-10 max-w-4xl mx-auto rounded-md shadow-md bg-[#e2c7a7] bg-opacity-50 dark:bg-[#4b4b4b] dark:bg-opacity-50 dark:shadow-gray-950">
            <h2 className="text-2xl font-bold mb-6 dark:text-[#3bba9c]">Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {projectOverview
                    .sort((a, b) => b.id - a.id)
                    .map((project) => (
                        <div
                            key={project.id}
                            className="relative shadow-md rounded-md bg-[#f7f7ed] bg-opacity-90 hover:bg-opacity-100 hover:shadow-lg p-4 transform transition duration-300 hover:-translate-y-2 flex flex-col dark:bg-white dark:bg-opacity-10 dark:hover:bg-opacity-15 dark:shadow-gray-950"
                        >
                            {/* Image */}
                            <img
                                src={require(`../assets/${project.image}`)} // Dynamically load the image
                                alt={`${project.title}`}
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

                            {/* Read More Link */}
                            <div className="flex justify-between items-center mt-4 mb-4">
                                <Link
                                    to={`/projects/${project.id}`}
                                    className="text-sm font-semibold hover:text-[#9c505a] underline dark:hover:text-[#3bba9c]"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
            <Link
                to="/projects"
                className="font-semibold underline hover:text-[#9c505a] dark:hover:text-[#3bba9c] mt-8 px-1 block"
            >
                More Projects
            </Link>
        </div>
    );
};

export default Projects;
