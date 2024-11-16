import './App.css';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import Gallery from './components/Gallery';
import Landing from './components/LandingSection';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer'
import ProjectsPage from "./pages/ProjectsPage";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      <Landing />
      <AboutSection />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
