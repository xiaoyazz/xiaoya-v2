import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import projectDetails from "../data/projectDetails.json";
import { FaHome, FaGithub } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import projectOverview from "../data/projectOverview.json";

const ProjectDetailsPage = () => {

    // Ensure  the page starts from beginning after redirection
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams();
    const project = projectDetails.find((proj) => proj.id === parseInt(id, 10));

    if (!project) {
        return <div>Project not found.</div>;
    }

    return (

        <div className="max-w-4xl mx-auto mt-28 px-4 text-left">

            {/* Breadcrumb */}
            <nav className="flex items-center mb-6 pb-6 text-sm dark:text-gray-400">
                <Link
                    to="/"
                    className="flex items-center gap-1 hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
                >
                    <FaHome /> Home
                </Link>
                <span className="mx-2">/</span>
                <Link
                    to="/projects"
                    className="flex items-center gap-1 hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
                >
                    Projects
                </Link>
                <span className="mx-2">/</span>
                <span className="font-bold text-[#9c505a] dark:text-[#3bba9c]">{project.title}</span>
            </nav>

            <div className="relative max-w-4xl mx-auto mt-2 pt-8 mb-10 pb-8 px-6 text-left shadow-md rounded-md bg-white bg-opacity-100 dark:bg-[#4b4b4b] dark:bg-opacity-50 dark:shadow-gray-950">

                <h1 className="text-2xl font-bold mb-4">{project.title}</h1>

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

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        {project.liveLink && ( // Render only if liveLink is not empty
                            <>
                                <span>Try it out 👉</span>
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-[#9c505a]"
                                >
                                    {project.liveLink}
                                </a>
                            </>
                        )}
                    </div>

                    {/* Git Repo */}
                    <div className="flex items-center gap-2">
                        <span>Git Repo 👉</span>
                        <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-[#9c505a]"
                        >
                            {project.repoLink}
                        </a>
                    </div>
                </div>

                {/* <div className="text-xl font-semibold mt-10 mb-2">Overview</div>
                <p className="mb-4 mt-2">
                    {project.overview.split('\n').map((line, index) => (
                        <p key={index} className="mb-2">{line}</p>
                    ))}</p>
                <div className="flex gap-2 mb-4">
                    {project.images
                        .filter((image) => image.trim() !== "")
                        .map((image, index) => (
                            <img
                                key={index}
                                src={require(`../assets/${image}`)}
                                alt={`${project.title} screenshot ${index + 1}`}
                                className="w-full md:w-1/2 rounded-md shadow-md"
                            />
                        ))}
                </div> */}
                <div className="text-xl font-semibold mt-10 mb-2">Overview</div>
                <div className="mb-4 mt-2 max-w-4xl mx-auto">
                    {/* Overview */}
                    <p>
                        {project.overview.split("\n").map((line, index) => (
                            <p key={index} className="mb-2">{line}</p>
                        ))}
                    </p>

                    {/* Images */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.images
                            .filter((image) => image.trim() !== "")
                            .map((image, index) => (
                                <img
                                    key={index}
                                    src={require(`../assets/${image}`)}
                                    alt={`${project.title} screenshot ${index + 1}`}
                                    className="w-full rounded-md shadow-md"
                                />
                            ))}
                    </div>
                </div>


                <div className="flex justify-between items-center mt-4 mb-4">
                    <Link
                        to={`/projects`}
                        className="font-semibold underline hover:text-[#9c505a] dark:hover:text-[#3bba9c] "
                    >
                        Back To Projects
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default ProjectDetailsPage;
