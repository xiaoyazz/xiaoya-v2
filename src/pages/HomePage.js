import React from 'react';
import Landing from '../components/LandingSection';
import AboutSection from '../components/AboutSection';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="relative">
            <Landing />
            <AboutSection />
            <Experience />
            <Projects />
        </div>
    );
};

export default HomePage;
