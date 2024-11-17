import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
    {
        title: "Smart Food",
        description:
            "An iOS mobile app allowing users to manage food in their fridge.",
        tags: ["Full-stack", "React", "iOS"],
        date: "Oct 8, 2023",
        liveLink: "#",
        repoLink: "#",
    },
    {
        title: "Workout G.E.M.",
        description:
            "An Android app designed to support individuals in their fitness by tracking their workout.",
        tags: ["Frontend", "React", "Android"],
        date: "Feb 13, 2023",
        liveLink: "#",
        repoLink: "#",
    },
    // Add more projects here...
];

const ProjectsPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Project List</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between"
                    >
                        {/* Project Title */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">
                                {project.title}
                            </h2>
                            {/* Description */}
                            <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
                                {project.description}
                            </p>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-semibold px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Date */}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                            {project.date}
                        </p>
                        {/* Links */}
                        <div className="flex justify-between items-center mt-4">
                            <a
                                href={project.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 dark:text-indigo-300 hover:underline text-sm"
                            >
                                <FaGithub className="inline mr-1" />
                                GitHub
                            </a>
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 dark:text-indigo-300 hover:underline text-sm"
                            >
                                <FaExternalLinkAlt className="inline mr-1" />
                                Live Demo
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
