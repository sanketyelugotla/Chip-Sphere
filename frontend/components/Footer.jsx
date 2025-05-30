import React from 'react';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-secondaryBackground text-center text-muted-foreground py-10 px-4">
            <div className="max-w-screen-xl mx-auto space-y-4">
                {/* Logo and Title */}
                <div className="flex items-center justify-center space-x-2">
                    <img
                        src="/logo.svg"
                        alt="Chip Sphere Logo"
                        className="w-6 h-6"
                    />
                    <span className="font-semibold text-lg">
                        Chip Sphere
                    </span>
                </div>

                {/* Tagline */}
                <p>Your Orbit for VLSI Learning, Quizzes, and Career Growth.</p>

                {/* Social Icons */}
                <div className="flex justify-center space-x-6 text-xl">
                    <a href="#" >
                        <FaFacebookF />
                    </a>
                    <a href="#" >
                        <FaTwitter />
                    </a>
                    <a href="#" >
                        <FaInstagram />
                    </a>
                    <a href="#" >
                        <FaLinkedinIn />
                    </a>
                    <a href="#" >
                        <FaGithub />
                    </a>
                </div>

                {/* Contact */}
                <p className="underline cursor-pointer">Contact Us</p>

                {/* Divider */}
                <hr className="my-4 border-muted-foreground w-11/12 mx-auto" />

                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm pt-5 ">
                    <p>© 2025 ChipSphere. All rights reserved.</p>
                    <p className="mt-2 sm:mt-0">
                        Fabricated with <span>❤️</span> for the next-gen chip designers!
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
