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
        <footer className="bg-[var(--secondaryBackground)] text-center text-[var(--secondaryForeground)] py-10 px-4">
            <div className="max-w-screen-xl mx-auto space-y-4">
                {/* Logo and Title */}
                <div className="flex items-center justify-center space-x-2">
                    <img
                        src="/logo.svg"
                        alt="Chip Sphere Logo"
                        className="w-6 h-6"
                    />
                    <span className="font-semibold text-lg text-[var(--primaryForeground)]">
                        Chip Sphere
                    </span>
                </div>

                {/* Tagline */}
                <p>Your Orbit for VLSI Learning, Quizzes, and Career Growth.</p>

                {/* Social Icons */}
                <div className="flex justify-center space-x-6 text-xl">
                    <a href="#" className="hover:text-[var(--primaryForeground)]">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="hover:text-[var(--primaryForeground)]">
                        <FaTwitter />
                    </a>
                    <a href="#" className="hover:text-[var(--primaryForeground)]">
                        <FaInstagram />
                    </a>
                    <a href="#" className="hover:text-[var(--primaryForeground)]">
                        <FaLinkedinIn />
                    </a>
                    <a href="#" className="hover:text-[var(--primaryForeground)]">
                        <FaGithub />
                    </a>
                </div>

                {/* Contact */}
                <p className="underline cursor-pointer">Contact Us</p>

                {/* Divider */}
                <hr className="my-4 border-gray-300 w-11/12 mx-auto" />

                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm px-4 text-gray-500">
                    <p>© 2025 ChipSphere. All rights reserved.</p>
                    <p className="mt-2 sm:mt-0">
                        Fabricated with <span className="text-pink-500">❤️</span> for the next-gen chip designers!
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
