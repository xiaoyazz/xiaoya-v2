import React from "react";
import { FaGithub, FaExternalLinkAlt, FaRegFolder } from "react-icons/fa";

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

];

const ProjectsPage = () => {
    return (
        <div className="max-w-4xl mx-auto mt-48 px-4 text-left">
            <h2 className="text-2xl font-bold mb-6 dark:text-[#3bba9c]">Projects</h2>
            <div className="grid md:grid-cols-2 gap-2">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="relative shadow-md rounded-md bg-white bg-opacity-80 hover:bg-opacity-95 hover:shadow-lg p-4 transform transition duration-300 hover:-translate-y-2 flex flex-col  dark:bg-opacity-5 dark:shadow-gray-900"
                    >
                        <div className="flex jitems-center mb-4">
                            <FaRegFolder className="text-4xl text-[#dd8ea4] dark:text-[#3bba9c]" />
                        </div>

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
                            <a href="#" className="text-sm font-semibold hover:text-[#dd8ea4] underline dark:hover:text-[#3bba9c]">
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
            <p className="mt-12 px-1">
                <a
                    href="https://github.com/xiaoyazz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#dd8ea4] transition-colors font-bold underline dark:hover:text-[#3bba9c]"
                >
                    More Projects on Github
                </a>
            </p>

            <hr className="border-t my-4 mt-8" /></div>
    );
};

export default ProjectsPage;