"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

// Custom NavLink Component
const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`hover:text-blue-500 transition-colors duration-200 ${isActive ? 'text-blue-500' : ''}`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {

  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark])

  return (
    <nav className='w-full h-[4rem] flex gap-5 justify-between px-[5rem] items-center'>
      <div className='flex gap-5 items-center'>
        <h1>Logo</h1>
        <NavLink href='/'>Chip Sphere</NavLink>
      </div>

      <div className='flex gap-7'>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/quizzes'>Quizzes</NavLink>
        <NavLink href='/resources'>Resources</NavLink>
        <NavLink href='/blogs'>Blogs</NavLink>
        <NavLink href='/projects'>Projects</NavLink>
        <NavLink href='/about'>About</NavLink>
      </div>

      <div className='flex items-center gap-8'>
        <h1 className='text-xl cursor-pointer' onClick={() => setDark(!dark)}>
          {dark ? <MdOutlineLightMode /> : <MdDarkMode />}
        </h1>
        <h1 className='text-xl cursor-pointer'><CgProfile /></h1>
      </div>
    </nav>
  )
}
