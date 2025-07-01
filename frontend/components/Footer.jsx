'use client'
import React from 'react';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';


const Footer = () => {
    return (
        <footer className="bg-secondaryBackground text-center text-muted-foreground py-10 px-4">
            <div className="max-w-screen-xl mx-auto space-y-4">
                {/* Logo and Title */}
                <div className="flex items-center justify-center space-x-2">
                    <Image
                        src="/ChipSphere.png"
                        alt="Chip Sphere Logo"
                        width={50}
                        height={50}
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
                <Link href={"/about#contact"}><p className="underline cursor-pointer">Contact Us</p></Link>

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
