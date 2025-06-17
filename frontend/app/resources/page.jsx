'use client'
import { getResources } from '@/utils/resources'
import React, { useState, useEffect } from 'react'
import ResourceCard from '@/components/ResourceCard'

export default function Resources() {

  const [resources, setResources] = useState([])
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        console.log("Fetched Resources:", data);
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, []);

  return (
    <div>
      <div className='w-full py-10 px-15 md:py-15 md:px-20 bg-[var(--secondaryBackground)]'>
        <h1 className='text-2xl md:text-5xl font-bold my-2'>Resources</h1>
        <p className=' text-sm md:text-md font-semibold text-[var(--secondaryForeground)] text-wrap'>Access a wide range of study materials, lecture notes, question papers and more to enhance your learning experience.</p>
      </div>
      <div>
        <div className='flex gap-2 sm:px-15 md:px-20 py-2 md:py-5' >
          <input type="text" placeholder='Search for resources...' className='flex-3 border-1 px-4 py-2 border-[var(--secondaryBackground)] rounded-md' />
          <select className='flex-1 border-1 px-4 py-2 border-[var(--secondaryBackground)] rounded-md'>
            <option value="all">All Categories</option>
            <option value="lecture-notes">Lecture Notes</option>
            <option value="question-papers">Question Papers</option>
            <option value="assignments">Assignments</option>
          </select>

          <select className='flex-1 border-1 px-4 py-2 border-[var(--secondaryBackground)] rounded-md'>
            <option value="all">All Types</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
            <option value="ppt">PPT</option>
          </select>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-4 px-15 md:px-20'>
          {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            typeOfFile={resource.typeOfFile}
            typeOfMaterial={resource.typeOfMaterial}
            NameOfFile={resource.name}
            descOfFile={resource.description}
            SizeOfFIle={resource.SizeOfFIlezeOfFile}
            NoOfDownloads={resource.noOfDownloads}
          />
          ))}
        </div>
      </div>
    </div>
  )
}