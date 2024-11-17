import { FaLinkedin, FaGithub, FaGoogle, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full mt-4 py-6 mb-10">
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center gap-4 mb-4">
                    <a href="https://www.linkedin.com/in/xiaoyazou/" target="_blank" rel="noopener noreferrer" className='hover:text-[#dd8ea4]'>
                        <FaLinkedin size={20} />
                    </a>
                    <a href="https://github.com/xiaoyazz" target="_blank" rel="noopener noreferrer" className='hover:text-[#dd8ea4]'>
                        <FaGithub size={20} />
                    </a>
                </div>
                <p className="text-sm text-gray-600">
                    Built and designed by Xiaoya Zou.<br />
                    All rights reserved. ©
                </p>
            </div>
        </footer>
    );
};

export default Footer;
