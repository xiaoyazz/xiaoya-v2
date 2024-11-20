import React, { useEffect } from 'react';
import Landing from '../components/LandingSection';
import AboutSection from '../components/AboutSection';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

const HomePage = () => {

    // ensure  the page starts from beginning after redirection
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
