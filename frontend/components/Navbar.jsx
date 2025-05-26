"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {

  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark])

  return (
    <nav className='w-full h-[4rem] flex gap-5 justify-between px-[5rem] items-center'>
      <div className='flex gap-5 items-center'>
        <h1>Logo</h1>
        <Link href='/' className='text-xl font-bold'>Chip Sphere</Link>
      </div>

      <div className='flex gap-7'>
        <Link href='/'>Home</Link>
        <Link href='/quizzes'>Quizzes</Link>
        <Link href='/resources'>Resources</Link>
        <Link href='/blogs'>Blogs</Link>
        <Link href='/projects'>Projects</Link>
        <Link href='/about'>About</Link>
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
