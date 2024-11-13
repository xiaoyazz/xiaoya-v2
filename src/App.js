import './App.css';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import Gallery from './components/Gallery';
import Landing from './components/LandingSection';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">

      <Navbar />
      <Landing />
      <AboutSection />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
