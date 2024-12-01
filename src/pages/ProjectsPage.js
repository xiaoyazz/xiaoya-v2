import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import projectDetails from "../data/projectDetails.json";

const ProjectsPage = () => {

    // Ensure  the page starts from beginning after redirection
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Sort the projects in descending order by id
    const sortedProjects = [...projectDetails].sort((a, b) => b.id - a.id);

    return (
        <div className="max-w-4xl mx-auto mt-28 px-4 text-left">

            {/* Breadcrumb */}
            <nav className="flex items-center mb-6 pb-2 text-sm dark:text-gray-400">
                <Link
                    to="/"
                    className="flex items-center gap-1 hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
                >
                    <FaHome /> Home
                </Link>
                <span className="mx-2">/</span>
                <span className="font-bold text-[#9c505a] dark:text-[#3bba9c]">Projects</span>
            </nav>

            {/* Projects Section */}
            <h2 className="text-2xl font-bold mb-6 dark:text-[#3bba9c]">Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {sortedProjects.map((project, index) => (
                    <div
                        key={index}
                        className="relative shadow-sm rounded-md bg-white bg-opacity-80 hover:bg-opacity-95 hover:shadow-lg p-4 flex flex-col dark:bg-[#4b4b4b] dark:bg-opacity-50 dark:shadow-gray-900 dark:hover:shadow-md"
                    >
                        {/* Icon */}
                        <div className="flex items-center mb-4">
                            <FaRegFolder className="text-4xl text-[#9c505a] dark:text-[#3bba9c]" />
                        </div>

                        {/* Project Title */}
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
                            {project.overview}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags?.map((tag, idx) => (
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
                            <Link
                                to={`/projects/${project.id}`}
                                className="text-sm font-semibold underline hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Projects Link */}
            <p className="mt-12 px-1 text-center">
                <a
                    href="https://github.com/xiaoyazz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9c505a] transition-colors font-bold underline dark:hover:text-[#3bba9c]"
                >
                    See More Projects on Github
                </a>
            </p>

            <p className="mt-6 px-1 text-center">
                <Link
                    to={`/`}
                    className="font-bold underline hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
                >
                    Back To Home
                </Link>
            </p>

            <hr className="border-t my-4 mt-8" />
        </div>
    );
};

export default ProjectsPage;
