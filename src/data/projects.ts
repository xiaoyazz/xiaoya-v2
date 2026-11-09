import type { Project } from './types';

// The eight projects shown in the Projects folder, in display order.
// `image` is the cover screenshot in public/assets/projects; `live` is null when there is no hosted demo.
export const projects: Project[] = [
  {
    id: "lunacare",
    title: "LunaCare Doctor Portal",
    category: "web",
    summary: "A React-based doctor portal for monitoring postpartum patients and reviewing health insights.",
    overview: "A fully deployed healthcare platform that lets providers review patient health and mood data, track trends, and view machine-learning-supported insights. Built with React, Firebase, GCP, and REST APIs. See more details about the LunaCare Backend and LunaCare ML Service repo on my github.",
    tags: [
      "Machine Learning",
      "React",
      "Firebase",
      "GCP",
      "REST APIs"
    ],
    date: "Oct 26, 2025",
    image: "lunaCare.png",
    images: [
      "lunaCare.png"
    ],
    github: "https://github.com/xiaoyazz/luna-doctor-portal",
    live: "https://newlunacare.web.app/"
  },
  {
    id: "roll-a-ball",
    title: "Roll A Ball",
    category: "game",
    summary: "A 3D Unity game where the player controls a ball with the mouse or keyboard.",
    overview: "A 3D game where the player controls a ball with the mouse or keyboard in a Unity scene. Developed with Unity and C#.",
    tags: [
      "Unity",
      "C#"
    ],
    date: "March 26, 2025",
    image: "RollBall.png",
    images: [
      "RollBall.png"
    ],
    github: "https://github.com/xiaoyazz/RollABall",
    live: null
  },
  {
    id: "library",
    title: "Library",
    category: "mobile",
    summary: "An iOS library app backed by a Node.js REST API and MongoDB, with the backend deployed on Render.",
    overview: "An iOS app to view, add, update, and delete books from a library. The backend is a Node.js app with a REST API deployed on Render. It manages data from both a local MongoDB database and MongoDB Atlas cloud.",
    tags: [
      "iOS",
      "Mobile App",
      "RESTful API",
      "MongoDB",
      "Cloud"
    ],
    date: "March 19, 2025",
    image: "Library.png",
    images: [
      "Library.png",
      "Library2.png",
      "Library3.png"
    ],
    github: "https://github.com/xiaoyazz/Assignment2.1_XiaoyaZou",
    live: null
  },
  {
    id: "smart-food",
    title: "Smart Food",
    category: "mobile",
    summary: "An iOS mobile app for managing food inventory, expiry dates, and notifications using Firebase.",
    overview: "The Smart Food App is a user-friendly iOS mobile application designed to help users efficiently manage their food inventory in the fridge. The app allows users to view, add, edit, and delete food items with ease. It features expiry notifications that users can enable or disable, providing timely reminders to prevent food waste. The app uses Firebase as its backend database to securely store and manage user data.",
    tags: [
      "iOS",
      "Mobile App",
      "Food Management"
    ],
    date: "February 1, 2024",
    image: "SmartFood.png",
    images: [
      "SmartFood.png"
    ],
    github: "https://github.com/xiaoyazz/Smart-Food",
    live: null
  },
  {
    id: "workout-gem",
    title: "Workout G.E.M.",
    category: "mobile",
    summary: "An Android fitness app for tracking workouts, goals, and daily activity.",
    overview: "The Workout G.E.M. App is an Android application designed to help users stay on top of their fitness goals by making it easier to track workouts, set goals, and monitor progress. It provides a simple and intuitive way to log exercises and keep track of daily activity while offering insights into workout habits.",
    tags: [
      "Android",
      "Mobile App",
      "Fitness Tracking"
    ],
    date: "January 20, 2024",
    image: "GEM.png",
    images: [
      "GEM.png"
    ],
    github: "https://github.com/xiaoyazz/workout-app",
    live: null
  },
  {
    id: "feedback",
    title: "Feedback",
    category: "web",
    summary: "A React feedback app for submitting ratings and feedback, backed by JSON Server during development.",
    overview: "The Feedback App is a React-based web application designed to make it easy for users to provide feedback and rate services. With its simple and user-friendly interface, the app allows users to share their thoughts, rate experiences, and contribute valuable insights. The app uses JSON Server as a mock backend to store and retrieve feedback data.",
    tags: [
      "React",
      "JSON Server",
      "Web Development"
    ],
    date: "October 10, 2023",
    image: "feedbackApp.png",
    images: [
      "feedbackApp.png"
    ],
    github: "https://github.com/xiaoyazz/feedback-app",
    live: null
  },
  {
    id: "my-quiz-app",
    title: "My Quiz App",
    category: "web",
    summary: "An interactive quiz app that loads questions dynamically from an external quiz API.",
    overview: "The Quiz App is a fun and interactive web application that lets users take quizzes across multiple categories. Built using JavaScript, HTML, and CSS, the app offers a dynamic experience by fetching questions in real time through the Open Quiz API. Users can test their knowledge on a variety of topics while enjoying a clean and responsive interface.",
    tags: [
      "Web Development",
      "Quiz API"
    ],
    date: "September 5, 2023",
    image: "quiz.jpeg",
    images: [
      "quiz.jpeg"
    ],
    github: "https://github.com/xiaoyazz/Quiz",
    live: "https://xiaoyazz.github.io/Quiz/"
  },
  {
    id: "my-weather",
    title: "My Weather",
    category: "web",
    summary: "A web app that displays real-time weather and forecast information using weather and location APIs.",
    overview: "My Weather App is a web application that provides users with real-time weather forecasts based on their current location. It fetches and displays detailed weather data, including temperature, humidity, wind speed, and a 5-day forecast from the OpenWeather API and geocoding API.",
    tags: [
      "Web Development",
      "Weather API",
      "Location API"
    ],
    date: "August 15, 2023",
    image: "WeatherApp.png",
    images: [
      "weather1.jpeg"
    ],
    github: "https://github.com/xiaoyazz/Weather-Application",
    live: "https://xiaoyazz.github.io/Weather-Application/"
  }
];
