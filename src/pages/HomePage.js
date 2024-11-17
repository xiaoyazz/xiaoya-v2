import React from 'react';
import Landing from '../components/LandingSection';
import AboutSection from '../components/AboutSection';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <>
            <Landing />
            <AboutSection />
            <Experience />
            <Projects />

        </>
    );
};

export default HomePage;
