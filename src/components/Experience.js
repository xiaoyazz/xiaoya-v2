import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import Strawberry from "../assets/strawberry.png";
import moonStar from "../assets/deco3.png"

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
        <div className="relative max-w-4xl mx-auto mt-20 pt-8 mb-10 pb-8 px-6 text-left shadow-md rounded-md bg-white bg-opacity-100  dark:bg-opacity-5 dark:shadow-gray-950">

            {/* <div className="absolute -top-25 right-[-15%] rotate-[10deg] transform translate-x-1/6 z-[-0.5]">
                <img
                    src={Strawberry}
                    alt="Decorative Element 1"
                    className="w-48 md:w-54 lg:w-80"
                />
            </div> */}


            {/* Top heading */}
            <h2 className="text-2xl font-bold mt-4 mb-6 dark:text-[#3bba9c]">Experience</h2>

            {/* Experience list */}
            <div className="space-y-8">
                {experiences.map((experience, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold">
                            {experience.title} @{" "}
                            <span className="dark:text-[#3bba9c]">
                                {experience.company}
                            </span>
                        </h3>
                        <p className="text-sm mb-4">
                            {experience.date} - {experience.location}
                        </p>
                        <ul className="space-y-2">
                            {experience.details.map((detail, idx) => (
                                <li key={idx} className="flex items-center gap-2 cursor-crosshair transform transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:text-[#dd8ea4] hover-text-shadow dark:hover:text-[#3bba9c]">
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
