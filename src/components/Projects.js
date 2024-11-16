import React from "react";
import { FaExternalLinkAlt, FaGithub, FaExternalLinkSquareAlt } from "react-icons/fa";
import { FaLink, FaRegFolderOpen } from "react-icons/fa6";
import { GoLinkExternal } from "react-icons/go";
import { AiOutlineFolder } from "react-icons/ai";
import SmartFood from "../assets/SmartFood.png"
import GEM from "../assets/GEM.png"
import Feedback from "../assets/feedbackApp.png"


const projects = [
    {
        title: "Smart Food",
        description:
            "An iOS mobile app allowing users to manage food in their fridge. Users can view, add, edit, and delete food item, and enable/disable expiry notification.",
        image: SmartFood,
        liveLink: "#",
        repoLink: "#"
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
        title: "Wi-Fi Scanner",
        description:
            "A React web app to collect user feedback and service ratings. Use JSON server as backend.",
        image: Feedback,
        liveLink: "#",
        repoLink: "#"
    }
];

const Projects = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 mt-10 text-left">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="relative bg-opacity-60 bg-slate-50 hover:bg-opacity-90 p-4 rounded-lg shadow-lg transform transition duration-300 hover:-translate-y-2 flex flex-col"
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
                            <a href="#" className="text-sm font-semibold hover:text-indigo-500 underline">
                                Read More
                            </a>
                            <div className="flex gap-3">
                                <a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl hover:text-indigo-500"
                                >
                                    <FaGithub />
                                </a>
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl hover:text-indigo-500"
                                >
                                    <FaExternalLinkAlt />
                                </a>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
            <p className="mt-12">
                <a
                    href="https://github.com/xiaoyazz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-500 transition-colors font-bold underline"
                >
                    All Projects
                </a>
            </p>

            <hr className="border-t my-4 mt-8" /></div>
    );
};

export default Projects;
