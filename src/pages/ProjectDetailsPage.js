import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import projectDetails from "../data/projectDetails.json";

const ProjectDetailsPage = () => {

    // ensure  the page starts from beginning after redirection
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams();
    const project = projectDetails.find((proj) => proj.id === parseInt(id, 10));

    if (!project) {
        return <div>Project not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-20 px-4 text-left">
            <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-600 mb-4">{project.details}</p>
            <div className="flex gap-2 mb-4">
                {project.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full md:w-1/2 rounded-md"
                    />
                ))}
            </div>
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
            <p className="text-sm text-gray-500 mb-6">{project.date}</p>
            <div className="flex gap-4">
                <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                >
                    View Repository
                </a>
                <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                >
                    Live Demo
                </a>
            </div>
            <Link
                to="/projects"
                className="text-sm font-semibold text-blue-500 underline hover:text-blue-700 mt-6 block"
            >
                Back to Projects
            </Link>
        </div>
    );
};

export default ProjectDetailsPage;
