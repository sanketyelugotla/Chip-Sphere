'use client'
import ProjectCard from '@/components/ProjectCard'
import { getProjects } from '@/utils/projects';
import React, { useEffect, useState } from 'react'

export default function Projects() {

  const [projects,setProjects] = useState([]);

  useEffect(() => {
       const fetchProjects = async () => {
          try {
            const data = await getProjects()
            console.log("Fetched Projects", data);
            setProjects(data);
          } catch (error) {
            console.error("Error fetching resources:", error);
          }
        };
        fetchProjects();
      }, []);


  return (
    <div>
      <div className='w-full py-10 px-15 md:py-15 md:px-20 bg-secondar-background'>
        <h1 className='text-2xl md:text-5xl font-bold my-2'>Projects</h1>
        <p className=' text-sm md:text-md font-semibold text-muted-foreground text-wrap'>Explore engineering projects shared by the community and contribute your own projects to showcase your skills.</p>
      </div>
      <div>
        <div className='flex gap-2 sm:px-15 md:px-20 py-2 md:py-5' >
          <input type="text" placeholder='Search for resources...' className='flex-3 border-1 px-4 py-2 border-secondar-background rounded-md' />
          <select className='flex-1 border-1 px-4 py-2 border-secondar-background rounded-md'>
            <option value="all">Domain</option>
            <option value="vlsi">VLSI</option>
            <option value="mixed-signals">Mixed Signals</option>
            <option value="pcb">PCB Design</option>
          </select>

          <select className='flex-1 border-1 px-4 py-2 border-secondar-background rounded-md'>
            <option value="sort">Sort</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="latest">latest</option>
            <option value="oldest">oldest</option>
          </select>
        </div>
        <div className='flex sm:mx-20 md:mx-20 rounded-md h-50 items-center border-1 border-secondar-background' >
          <div className='flex flex-col gap-2 px-6 py-8 bg-background'>
            <h1 className='text-md md:text-xl font-bold'>Have a project to share?</h1>
            <p className='text-sm md:text-md font-semibold text-muted-foreground text-wrap'>showcase your engineering project to community and get feedback from peers and experts.</p>
            <button className='rounded-md px-5 py-2 my-2 sm:my-4 w-50 text-sm text-background bg-primary border-1'>Submit your project</button>
          </div>
          <img />
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3 mt-5 px-15 md:px-20'>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            domain={project.category}
            nameOfProject={project.title}
            descOfProject={project.description}
            technologyUsed={project.technologyUsed}
            contributers={project.contributors.join(', ')}
            imageUrl={project.imageUrl}
            />
            ))}
        </div>
      </div>
    </div>
  )
}
