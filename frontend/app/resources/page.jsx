import ResourceCard from '@/components/ResourceCard'
import React from 'react'

export default function Resources() {
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
          <ResourceCard typeOfFile={"PDF"} typeOfMaterial="Lecture Notes" NameOfFile="Data Structures and Algorithms" descOfFile="Comprehensive notesddsvsdvsdv sdvsdv sd v dsvsd vsdv dsvsd s on Data Structures and Algorithms." SizeOfFIle="2.5 MB" NoOfDownloads={150} />
          <ResourceCard typeOfFile={"PDF"} typeOfMaterial="Lecture Notes" NameOfFile="Data Structures and Algorithms" descOfFile="Comprehensive notesddsvsdvsdv sdvsdv sd v dsvsd vsdv dsvsd s on Data Structures and Algorithms." SizeOfFIle="2.5 MB" NoOfDownloads={150} />
          <ResourceCard typeOfFile={"PDF"} typeOfMaterial="Lecture Notes" NameOfFile="Data Structures and Algorithms" descOfFile="Comprehensive notesddsvsdvsdv sdvsdv sd v dsvsd vsdv dsvsd s on Data Structures and Algorithms." SizeOfFIle="2.5 MB" NoOfDownloads={150} />
          <ResourceCard typeOfFile={"PDF"} typeOfMaterial="Lecture Notes" NameOfFile="Data Structures and Algorithms" descOfFile="Comprehensive notesddsvsdvsdv sdvsdv sd v dsvsd vsdv dsvsd s on Data Structures and Algorithms." SizeOfFIle="2.5 MB" NoOfDownloads={150} />
          <ResourceCard typeOfFile={"PDF"} typeOfMaterial="Lecture Notes" NameOfFile="Data Structures and Algorithms" descOfFile="Comprehensive notesddsvsdvsdv sdvsdv sd v dsvsd vsdv dsvsd s on Data Structures and Algorithms." SizeOfFIle="2.5 MB" NoOfDownloads={150} />
          <ResourceCard typeOfFile={"PDF"} typeOfMaterial="Lecture Notes" NameOfFile="Data Structures and Algorithms" descOfFile="Comprehensive notesddsvsdvsdv sdvsdv sd v dsvsd vsdv dsvsd s on Data Structures and Algorithms." SizeOfFIle="2.5 MB" NoOfDownloads={150} />
          <ResourceCard typeOfFile={"PDF"} typeOfMaterial="Lecture Notes" NameOfFile="Data Structures and Algorithms" descOfFile="Comprehensive notesddsvsdvsdv sdvsdv sd v dsvsd vsdv dsvsd s on Data Structures and Algorithms." SizeOfFIle="2.5 MB" NoOfDownloads={150} />
          <ResourceCard typeOfFile={"PDF"} typeOfMaterial="Lecture Notes" NameOfFile="Data Structures and Algorithms" descOfFile="Comprehensive notesddsvsdvsdv sdvsdv sd v dsvsd vsdv dsvsd s on Data Structures and Algorithms." SizeOfFIle="2.5 MB" NoOfDownloads={150} />
          <ResourceCard typeOfFile={"DOCX"} typeOfMaterial="Question Paper" NameOfFile="Computer Networks - Midterm" descOfFile="Midterm ques;sdmvsdv alkv asl vasvaslv asl  weewf wefwefewf t" SizeOfFIle="1.2 MB" NoOfDownloads={200} />
        </div>
      </div>
    </div>
  )
}
