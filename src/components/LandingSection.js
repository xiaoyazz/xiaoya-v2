// LandingPage.js
import React from 'react';
import avatar from '../assets/avatar.png';
import scrollDownIcon from '../assets/scroll-down.png';


const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 mt-24">
            <img
                src={avatar}
                alt="Xiaoya's Avatar"
                className="w-22 h-24 mt-12"
            />
            <div className="mt-10 max-w-md">
                <h1 className="text-3xl font-bold"> Hi, I'm <span className="text-indigo-500">Xiaoya</span>.</h1>
                <h3 className="text-2xl font-bold">I create, build, and explore technology.</h3>
                <p className="text-lg mt-4">
                    I'm a student developer based in Toronto, Canada. I'm passionate about full-stack development, mobile computing, and AI.
                </p>
            </div>

            <div className="animate-bounce mt-12">
                <img src={scrollDownIcon} alt="Scroll Down" className="h-20 w-20" />
            </div>

        </div>
    );
};

export default LandingPage;
