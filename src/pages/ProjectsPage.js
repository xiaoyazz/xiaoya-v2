import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
    {
        title: "Smart Food",
        description: "An iOS mobile app allowing users to manage food in their fridge.",
        tags: ["Full-stack", "React", "iOS"],
        image: "path_to_image",
        date: "Oct 8, 2023",
        repoLink: "#",
        liveLink: "#",
    },
    {
        title: "Workout G.E.M.",
        description: "An Android app designed to support individuals in their fitness by tracking their workout.",
        tags: ["Frontend", "React", "Android"],
        image: "path_to_image",
        date: "Feb 13, 2023",
        repoLink: "#",
        liveLink: "#",
    },
    // Add more projects here...
];

const ProjectsPage = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Project List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 transition transform hover:scale-105"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h2 className="text-xl font-semibold">{project.title}</h2>
                        <p className="text-sm text-gray-600">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="text-xs text-gray-400">{project.date}</div>
                        <div className="flex justify-between items-center mt-4">
                            <a
                                href={project.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 hover:underline"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 hover:underline"
                            >
                                <FaExternalLinkAlt />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
