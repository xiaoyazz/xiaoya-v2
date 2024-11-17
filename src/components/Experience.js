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
                "Developed an Android app with Firebase to collect Wi-Fi APs in the college.",
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
        <div className="max-w-4xl mx-auto pt-8 pb-8 px-4 text-left shadow-md rounded-md bg-white bg-opacity-80">

            {/* Top heading */}
            <h2 className="text-2xl font-bold mb-6">Experience</h2>

            {/* Experience list */}
            <div className="space-y-8">
                {experiences.map((experience, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold">
                            {experience.title} @{" "}
                            <span className="">
                                {experience.company}
                            </span>
                        </h3>
                        <p className="text-sm mb-4">
                            {experience.date} - {experience.location}
                        </p>
                        <ul className="space-y-2">
                            {experience.details.map((detail, idx) => (
                                <li key={idx} className="flex items-center gap-2 cursor-crosshair transform transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:text-[#dd8ea4] hover-text-shadow">
                                    <FaAngleRight />
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {/* <hr className="border-t my-4 mt-12" /> */}
        </div>
    );
};

export default Experience;
