import React from "react";
import { FaExternalLinkAlt, FaGithub, FaExternalLinkSquareAlt } from "react-icons/fa";
import { FaLink, FaRegFolderOpen } from "react-icons/fa6";
import { GoLinkExternal } from "react-icons/go";
import { AiOutlineFolder } from "react-icons/ai";
import SmartFood from "../assets/SmartFood.png"


const projects = [
    {
        title: "Smart Food",
        description:
            "An iOS mobile app allowing users to manage food in their fridge.",
        image: SmartFood,
        liveLink: "#",
        repoLink: "#"
    },
    {
        title: "To-Do List",
        description:
            "A to-do list app allowing users to create, cross, and clear tasks. Developed with HTML, CSS, and JavaScript. Saves data in localStorage.",
        image: "path/to/todo-list-image.png", // Replace with your image path
        liveLink: "#",
        repoLink: "#"
    },
    {
        title: "My Bakery",
        description:
            "An online bakery shop allowing users to log in, view, and buy products. Developed with ASP.NET Core Blazor Server.",
        image: "path/to/bakery-image.png", // Replace with your image path
        liveLink: "#",
        repoLink: "#"
    }
];

const Projects = () => {
    return (
        <div className="max-w-4xl mx-auto mt-20 text-left">
            <h2 className="text-4xl font-bold mb-6">Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="relative group bg-stone-50 p-6 rounded-lg shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >


                        {/* Image */}
                        <img
                            src={project.image}
                            alt={project.title}
                            className="rounded-t-lg w-full h-48 object-cover mt-6 mb-6"
                        />

                        {/* Project title */}
                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>

                        {/* Description */}
                        <p className=" text-sm mb-4">{project.description}</p>

                        {/* Top section with icon and links */}
                        <div className="flex justify-between items-center mb-4">

                            <div className="flex gap-3">

                                <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="text-xl hover:text-[#00a5b3]" />
                                </a>

                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                    <FaLink className="text-xl hover:text-[#00a5b3]" />
                                </a>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="mt-6">
                <a
                    href="https://github.com/xiaoyazz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00C2D1] transition-colors font-bold underline"
                >
                    All Projects
                </a>
            </p>

        </div>
    );
};

export default Projects;
