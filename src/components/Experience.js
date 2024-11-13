import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";

const Experience = () => {
    const experiences = [
        {
            company: "Sheridan College Centre for Applied AI (CAAI)",
            title: "Application Developer",
            location: "Oakville, Ontario, Canada",
            date: "May 2023 - Dec 2023 (Contract)",
            details: [
                "Developed Machine Learning models for Telus to implement a 3-D indoor location system.",
                "Refined the accuracy and precision of the new system."
            ]
        },
        {
            company: "Ministry of Public and Business Service Delivery",
            title: "Low-Code Application Developer",
            location: "Toronto, Ontario, Canada",
            date: "Jan 2022 - Sep 2022 (Co-op)",
            details: [
                "Created and maintained projects using technologies such as C#, ASP.NET Core MVC, and Entity Framework.",
                "Worked with ASP.NET Core Blazor Server, AJAX, jQuery, HTML, and CSS."
            ]
        },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 mt-20 text-left">
            {/* Top heading */}
            <h2 className="text-4xl font-bold mb-6">Experience</h2>

            {/* Experience list */}
            <div className="space-y-8">
                {experiences.map((experience, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold">
                            {experience.title} @{" "}
                            <span className="text-[#00C2D1]">
                                {experience.company}
                            </span>
                        </h3>
                        <p className="text-sm mb-4">
                            {experience.date} - {experience.location}
                        </p>
                        <ul className="space-y-2">
                            {experience.details.map((detail, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <FaAngleRight color="#00C2D1" />
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
