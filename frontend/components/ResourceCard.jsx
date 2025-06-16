import React from 'react'

function ResourceCard({ typeOfFile, typeOfMaterial, NameOfFile, descOfFile, SizeOfFIle, NoOfDownloads }) {
    return (
        <div className=' flex flex-col gap-4 border-1 border-[var(--secondaryBackground)] rounded-md px-6 py-8 bg-[var(--background)]'>
            <div className='flex justify-between'>
                <p className=' text-xs py-1 font-bold px-2 border-1 border-[var(--secondaryBackground)] rounded-full'>{typeOfFile}</p>
                <p className='text-xs py-1 font-bold px-2 rounded-full bg-[var(--blue)] text-[var(--background)]'>{typeOfMaterial}</p>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <p className='h-12 w-12 rounded-full bg-[var(--secondaryBackground)]'></p>
                <h1 className='text-2xl font-bold text-wrap h-[64] overflow-hidden text-center'>{NameOfFile}</h1>
                <p className='text-sm font-semibold text-center text-wrap h-[40] overflow-hidden  text-[var(--secondaryForeground)]'>{descOfFile}</p>
            </div>
            <div className='flex justify-between'>
                <p className=' text-sm text-[var(--secondaryForeground)]'>Size: {SizeOfFIle}</p>
                <p className=' text-sm text-[var(--secondaryForeground)]'>{NoOfDownloads} downloads</p>
            </div>
            <div className='flex justify-between gap-2'>
                <button className='rounded-md w-[50%] py-2 text-sm text-[var(--foreground)] bg-[var(--Background)] border-1 border-[var(--secondaryBackground)]'> Save</button>
                <button className='rounded-md w-[50%] py-2 text-sm text-[var(--background)] bg-[var(--blue)] border-1'> Download</button>
            </div>
        </div>
    )
}

export default ResourceCard