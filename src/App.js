import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import About from "./components/AboutSection";
import Experience from "./components/Experience";
import ProjectsPage from "./pages/ProjectsPage";
import Footer from "./components/Footer"
import { ImOpt } from "react-icons/im";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/xiaoya-v2" element={<HomePage />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} /> */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
