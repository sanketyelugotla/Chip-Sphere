"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {

  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  },[dark])

  return (
    <nav className='w-full h-[4rem]  flex gap-5 justify-between px-[5rem] items-center'>
      <div className='flex gap-5'>
        <h1>Logo</h1>
        <h1>Chip Sphere</h1>
      </div>

      <div className='flex gap-7'>
        <Link href='/'>Home</Link>
        <Link href='/quizzes'>Quizzes</Link>
        <Link href='/resources'>Resources</Link>
        <Link href='/blogs'>Blogs</Link>
        <Link href='/projects'>Projects</Link>
        <Link href='/about'>About</Link>
      </div>

      <div className='flex gap-5'>
        <h1 onClick={()=>setDark(!dark)}>Mode</h1>
        <h1>Profile</h1>
      </div>
    </nav>
  )
}
