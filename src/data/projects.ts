import type { Project } from "../types/content";

import feedbackApp from "../assets/feedbackApp.png";
import gem from "../assets/GEM.png";
import library from "../assets/Library.png";
import library2 from "../assets/Library2.png";
import library3 from "../assets/Library3.png";
import quiz from "../assets/quiz.jpeg";
import rollBall from "../assets/RollBall.png";
import smartFood from "../assets/SmartFood.png";
import weatherApp from "../assets/WeatherApp.png";
import weather1 from "../assets/weather1.jpeg";
import lunaCare from "../assets/lunaCare.png";

export const projects: Project[] = [
  {
    id: 1,
    title: "My Weather",
    summary:
      "A web app that displays real-time weather and forecast information using weather and location APIs.",
    overview:
      "My Weather App is a web application that provides users with real-time weather forecasts based on their current location. It fetches and displays detailed weather data, including temperature, humidity, wind speed, and a 5-day forecast from the OpenWeather API and geocoding API.",
    coverImage: weatherApp,
    images: [weather1],
    repoLink: "https://github.com/xiaoyazz/Weather-Application",
    liveLink: "https://xiaoyazz.github.io/Weather-Application/",
    tags: ["Web Development", "Weather API", "Location API"],
    date: "August 15, 2023",
  },
  {
    id: 2,
    title: "My Quiz App",
    summary:
      "An interactive quiz app that loads questions dynamically from an external quiz API.",
    overview:
      "The Quiz App is a fun and interactive web application that lets users take quizzes across multiple categories. Built using JavaScript, HTML, and CSS, the app offers a dynamic experience by fetching questions in real time through the Open Quiz API. Users can test their knowledge on a variety of topics while enjoying a clean and responsive interface.",
    coverImage: quiz,
    images: [quiz],
    repoLink: "https://github.com/xiaoyazz/Quiz",
    liveLink: "https://xiaoyazz.github.io/Quiz/",
    tags: ["Web Development", "Quiz API"],
    date: "September 5, 2023",
  },
  {
    id: 3,
    title: "Feedback",
    summary:
      "A React feedback app for submitting ratings and feedback, backed by JSON Server during development.",
    overview:
      "The Feedback App is a React-based web application designed to make it easy for users to provide feedback and rate services. With its simple and user-friendly interface, the app allows users to share their thoughts, rate experiences, and contribute valuable insights. The app uses JSON Server as a mock backend to store and retrieve feedback data.",
    coverImage: feedbackApp,
    images: [feedbackApp],
    repoLink: "https://github.com/xiaoyazz/feedback-app",
    tags: ["React", "JSON Server", "Web Development"],
    date: "October 10, 2023",
  },
  {
    id: 4,
    title: "Workout G.E.M.",
    summary:
      "An Android fitness app for tracking workouts, goals, and daily activity.",
    overview:
      "The Workout G.E.M. App is an Android application designed to help users stay on top of their fitness goals by making it easier to track workouts, set goals, and monitor progress. It provides a simple and intuitive way to log exercises and keep track of daily activity while offering insights into workout habits.",
    coverImage: gem,
    images: [gem],
    repoLink: "https://github.com/xiaoyazz/workout-app",
    tags: ["Android", "Mobile App", "Fitness Tracking"],
    date: "January 20, 2024",
  },
  {
    id: 5,
    title: "Smart Food",
    summary:
      "An iOS mobile app for managing food inventory, expiry dates, and notifications using Firebase.",
    overview:
      "The Smart Food App is a user-friendly iOS mobile application designed to help users efficiently manage their food inventory in the fridge. The app allows users to view, add, edit, and delete food items with ease. It features expiry notifications that users can enable or disable, providing timely reminders to prevent food waste. The app uses Firebase as its backend database to securely store and manage user data.",
    coverImage: smartFood,
    images: [smartFood],
    repoLink: "https://github.com/xiaoyazz/Smart-Food",
    tags: ["iOS", "Mobile App", "Food Management"],
    date: "February 1, 2024",
    featured: true,
  },
  {
    id: 6,
    title: "Library",
    summary:
      "An iOS library app backed by a Node.js REST API and MongoDB, with the backend deployed on Render.",
    overview:
      "An iOS app to view, add, update, and delete books from a library. The backend is a Node.js app with a REST API deployed on Render. It manages data from both a local MongoDB database and MongoDB Atlas cloud.",
    coverImage: library,
    images: [library, library2, library3],
    repoLink: "https://github.com/xiaoyazz/Assignment2.1_XiaoyaZou",
    tags: ["iOS", "Mobile App", "RESTful API", "MongoDB", "Cloud"],
    date: "March 19, 2025",
    featured: true,
  },
  {
    id: 7,
    title: "Roll A Ball",
    summary:
      "A 3D Unity game where the player controls a ball with the mouse or keyboard.",
    overview:
      "A 3D game where the player controls a ball with the mouse or keyboard in a Unity scene. Developed with Unity and C#.",
    coverImage: rollBall,
    images: [rollBall],
    repoLink: "https://github.com/xiaoyazz/RollABall",
    tags: ["Unity", "C#"],
    date: "March 26, 2025",
    featured: false,
  },
  {
    id: 8,
    title: "LunaCare Doctor Portal",
    summary:
      "A web-based portal for doctors to manage patient records and ML-based PPD predictions.",
    overview:
      "A web application designed for doctors to efficiently manage patient records, ML-based PPD predictions and visualizations, and communicate with patients. Built with Machine Learning models and modern web technologies. Check out the backend and Machine Learning service repositories on my github for more details.",
    coverImage: lunaCare,
    images: [lunaCare],
    liveLink: "https://newlunacare.web.app/",
    repoLink: "https://github.com/xiaoyazz/luna-doctor-portal",
    tags: ["Web App", "JavaScript", "React", "Machine Learning"],
    date: "October 25, 2026",
    featured: true,
  },
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => b.id - a.id);

export const sortedProjects = [...projects].sort((a, b) => b.id - a.id);
