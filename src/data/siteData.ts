import type { ExperienceItem } from "../types/content";

export const siteConfig = {
  name: "Xiaoya",
  fullName: "Xiaoya Zou",
  linkedin: "https://www.linkedin.com/in/xiaoyazou/",
  github: "https://github.com/xiaoyazz",
};

export const about = {
  description:
    "I am a Computer Science student graduating in December 2026. I'm passionate about full-stack development, mobile computing, and AI. Outside of school and work, I like camping, cycling, and snowboarding.",
  technologies: [
    "iOS Development / Swift / SwiftUI",
    "Android Development / Kotlin",
    "Python / Machine Learning / EDA/ LLMs / AI Agents",
    "LLMs / AI Agents / RAG",
    "OOP / Java / Spring Boot",
    "C# / .NET",
    "C / C++ / Assembly",
    "Full-Stack Development / RESTful API / React",
    "Node.js",
    "JavaScript / TypeScript / Angular / HTML / CSS",
    "Firebase / MongoDB / PostgreSQL / MS SQL Server",
    "SQL / NoSQL / MySQL",
    "Google Cloud / AWS / Azure / IBM Cloud",
    "Git / Docker / CI/CD",
  ],
};

export const experiences: ExperienceItem[] = [
  {
    company: "Cultara",
    title: "Frontend Developer & Web Experience Engineer",
    location: "Mississauga, Ontario, Canada",
    date: "Jan 2026 - Present",
    details: [
      "Built and maintained features for a React + TypeScript SaaS application, including dashboard layouts, report pages, graphs, and reusable components.",
      "Created custom hooks and data-mapping logic to transform structured JSON data into dynamic UI elements such as scorecards, gauges, charts, tabs, and evidence/confidence views.",
      "Improved frontend quality through responsive CSS updates, component refactoring, bug fixes, routing, session-based state, and consistent design patterns.",
      "Collaborated with a diverse team of developers and stakeholders to deliver production features and solve technical problems.",
    ],
  },
  {
    company: "Infostructure Technology Inc",
    title: "Application Developer",
    location: "Brampton, Ontario, Canada",
    date: "May 2025 - Aug 2025 (Internship)",
    details: [
      "Developed and optimized backend services and RESTful APIs for childcare management systems using C# and .NET.",
      "Built responsive user interfaces with Bootstrap, JavaScript, Razor, Ajax, and jQuery.",
      "Managed data using SQL and LINQ with Azure SQL.",
      "Implemented CI/CD pipelines with Azure DevOps for cloud-based applications.",
    ],
  },
  {
    company: "Sheridan College Centre for Applied AI (CAAI) + TELUS",
    title: "Application Developer",
    location: "Oakville, Ontario, Canada",
    date: "May 2023 - Dec 2023 (Co-op)",
    details: [
      "Developed an Android app with Firebase to collect Wi-Fi access point data in the college.",
      "Developed machine learning models for TELUS to implement a 3-D indoor location system.",
      "Completed data analysis and visualization for Wi-Fi access point data.",
      "Refined the accuracy and precision of the new system.",
    ],
  },
  {
    company: "Ontario Public and Business Service Delivery",
    title: "Low-Code Application Developer",
    location: "Toronto, Ontario, Canada",
    date: "Jan 2022 - Sep 2022 (Co-op)",
    details: [
      "Created and maintained projects using C#, ASP.NET Core MVC, and Entity Framework.",
      "Worked with ASP.NET Core Blazor Server, AJAX, jQuery, HTML, and CSS.",
      "Delivered low-code solutions for clients with Microsoft Power Platform.",
    ],
  },
];
