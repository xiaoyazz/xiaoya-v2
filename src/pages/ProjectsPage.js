import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaGithub, FaExternalLinkAlt, FaRegFolder } from "react-icons/fa";

const projects = [
    {
        title: "Smart Food",
        description:
            "An iOS mobile app allowing users to manage food in their fridge.",
        tags: ["iOS", "Mobile", "Firebase"],
        date: "Oct 8, 2023",
        liveLink: "#",
        repoLink: "#",
    },
    {
        title: "Workout G.E.M.",
        description:
            "An Android app designed to support individuals in their fitness by tracking their workout.",
        tags: ["Android", "Mobile"],
        date: "Feb 13, 2023",
        liveLink: "#",
        repoLink: "#",
    },
];

const ProjectsPage = () => {
    return (
        <div className="max-w-4xl mx-auto mt-48 px-4 text-left">

            <nav className="flex items-center mb-6 pb-6 text-sm text-gray-600 dark:text-gray-400">
                <Link
                    to="/"
                    className="flex items-center gap-1 hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
                >
                    <FaHome /> Home
                </Link>
                <span className="mx-2">/</span>
                <span>Projects</span>
            </nav>


            <h2 className="text-2xl font-bold mb-6 dark:text-[#3bba9c]">Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="relative shadow-md rounded-md bg-white bg-opacity-80 hover:bg-opacity-95 hover:shadow-lg p-4 transform transition duration-300 hover:-translate-y-2 flex flex-col dark:bg-opacity-5 dark:shadow-gray-900"
                    >
                        <div className="flex items-center mb-4">
                            <FaRegFolder className="text-4xl text-[#9c505a] dark:text-[#3bba9c]" />
                        </div>

                        {/* Project title */}
                        <h3 className="text-lg font-semibold mt-2 mb-2">{project.title}</h3>

                        {/* Description */}
                        <p
                            className="text-sm mb-4"
                            style={{
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold py-1 px-2 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Bottom Section */}
                        <div className="flex justify-between items-center mt-4 mb-4">
                            <a
                                href={project.liveLink}
                                className="text-sm font-semibold hover:text-[#9c505a] underline dark:hover:text-[#3bba9c]"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <p className="mt-12 px-1">
                <a
                    href="https://github.com/xiaoyazz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9c505a] transition-colors font-bold underline dark:hover:text-[#3bba9c]"
                >
                    More Projects on Github
                </a>
            </p>

            <hr className="border-t my-4 mt-8" />
        </div>
    );
};

export default ProjectsPage;
