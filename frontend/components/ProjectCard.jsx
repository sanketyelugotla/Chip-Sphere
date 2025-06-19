import React from 'react'

function ProjectCard({domain, nameOfProject, descOfProject, technologyUsed, contributers, imageUrl}) {
  return (
    <div className='flex flex-col p-4 h-100 border-1 border-secondar-background rounded-md bg-background shadow-md'>
        <div className='flex-2 flex'>
            <img className='absolute w-90 h-40' src={imageUrl}/>

            <p className=' relative top-2 left-2 h-4  text-[11px] font-semibold px-2 rounded-full bg-primary text-background'>{domain}</p>
        </div>
        <div className=' flex-3 mt-10'>
            <h1 className='text-2xl font-semibold h-[32] sm:h-[64] text-wrap overflow-hidden'>{nameOfProject}</h1>
            <p className='text-sm text-wrap h-[20] sm:h-[40] overflow-hidden text-muted-foreground'>{descOfProject}</p>
            <div className='flex'>
                <p className=' text-[9px] py-1 px-2 border-1 mt-2 border-secondar-background rounded-full'>{technologyUsed}</p>
            </div>
            <div className='flex my-2'>
                <img/>
                <p className='text-xs text-wrap overflow-hidden  text-muted-foreground'>Contributors: {contributers}</p>
            </div>
            <button className='bg-none text-primary text-sm'>View Project →</button>
        </div>
    </div>
  )
}

export default ProjectCard