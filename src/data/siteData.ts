import type { Education, Experience, Person } from './types';

export const person: Person = {
  name: "Xiaoya Zou",
  role: "👩🏻‍💻 Software developer",
  intro: "I build web and mobile apps, and explore applied AI.",
  about: "I'm studying Computer Science at Sheridan College in Canada. I build web and mobile apps and I'm interested in AI. I also like camping, cycling and snowboarding.",
  github: "https://github.com/xiaoyazz",
  linkedin: "https://www.linkedin.com/in/xiaoyazou/",
  interests: [
    "Camping",
    "Cycling",
    "Snowboarding"
  ]
};

export const education: Education = {
  field: "Honours Bachelor of Computer Science",
  institution: "Sheridan College",
  country: "Canada",
  expectedGraduation: "December 2026"
};

export const experiences: Experience[] = [
  {
    company: "Cultara",
    title: "Frontend Developer & Web Experience Engineer (Internship/Co-op)",
    location: "Mississauga, Ontario, Canada",
    date: "Jan 2026 - Present",
    details: [
      "Built React and TypeScript dashboards, report pages, charts, and reusable components.",
      "Transformed structured data into scorecards and evidence views, and improved responsive layouts and routing."
    ]
  },
  {
    company: "Infostructure Technology Inc",
    title: "Application Developer (Internship/Co-op)",
    location: "Brampton, Ontario, Canada",
    date: "May 2025 - Aug 2025",
    details: [
      "Developed C# and .NET APIs for childcare management systems.",
      "Built responsive interfaces and worked with Azure SQL, LINQ, and Azure DevOps."
    ]
  },
  {
    company: "Sheridan College Centre for Applied AI (CAAI) + TELUS",
    shortCompany: "CAAI + TELUS",
    title: "Application Developer (Internship/Co-op)",
    location: "Oakville, Ontario, Canada",
    date: "May 2023 - Dec 2023",
    details: [
      "Built an Android and Firebase app to collect Wi-Fi access point data.",
      "Developed and evaluated machine learning models for a 3D indoor location system with TELUS."
    ]
  },
  {
    company: "Ontario Public and Business Service Delivery",
    title: "Low-Code Application Developer (Internship/Co-op)",
    location: "Toronto, Ontario, Canada",
    date: "Jan 2022 - Sep 2022",
    details: [
      "Built and maintained C# and ASP.NET applications.",
      "Created client solutions with Blazor Server and Microsoft Power Platform."
    ]
  }
];

// The year updates itself each January.
export const copyright = `© ${new Date().getFullYear()} Xiaoya Zou. All rights reserved.`;
