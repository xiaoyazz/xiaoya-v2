import React from 'react';
import avatar from '../assets/avatar.png';
import villagerMe from '../assets/villagerMe.png'
import Deco0 from '../assets/deco0.png'

const LandingPage = () => {
    return (
        <div className="text-left mt-40 px-4 max-w-4xl mx-auto relative">
            {/* Fixed Blurred Background */}
            {/* <div
                className="fixed inset-0 bg-indigo-700 blur-[700px] z-[-1]"
                style={{
                    width: '100vw',
                    height: '150px',
                    top: '30%',
                    left: '',
                    //transform: 'translate(-50%, 0)',
                }}
            ></div> */}

            {/* <img
                src={Deco0}
                alt="Banner"
            /> */}

            <img
                src={villagerMe}
                alt="Xiaoya's Avatar"
                className="w-20 h-22 animate-bounce"
            />
            <h1 className="text-5xl font-bold mt-8">
                Hi, I'm <span className="text-[#dd8ea4] dark:text-[#3bba9c]">Xiaoya</span>.
            </h1>
            <h3 className="text-2xl mt-4 font-bold">
                I create, build, and explore technology.
            </h3>

            {/* <hr className="border-t my-4 mt-12" /> */}
        </div>
    );
};

export default LandingPage;
