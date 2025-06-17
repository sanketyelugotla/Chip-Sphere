import React from 'react'

function ResourceCard({typeOfFile,typeOfMaterial,NameOfFile,descOfFile,SizeOfFIle,NoOfDownloads}) {
  return (
    <div className=' flex flex-col gap-6 border-1 border-secondar-background rounded-md px-6 py-8 bg-background  shadow-md'>
        <div className='flex justify-between'>
            <p className=' text-xs py-1 font-bold px-2 border-1 border-secondar-background rounded-full'>{typeOfFile}</p>
            <p className='text-xs py-1 font-bold px-2 rounded-full bg-primary text-background'>{typeOfMaterial}</p>
        </div>
        <div className='flex flex-col h-[150] items-center gap-2'>
            <p className='h-12 w-12 rounded-full bg-secondar-background'></p>
            <h1 className='text-2xl font-bold text-wrap overflow-hidden text-center'>{NameOfFile}</h1>
            <p className='text-sm font-semibold text-center text-wrap h-[40] overflow-hidden  text-secondary-foreground'>{descOfFile}</p>
        </div>
        <div className='flex justify-between'>
            <p className=' text-sm text-secondary-foreground'>Size: {SizeOfFIle}</p>
            <p className=' text-sm text-secondary-foreground'>{NoOfDownloads} downloads</p>
        </div>
        <div className='flex justify-between gap-2'>
            <button className='rounded-md w-[50%] py-2 text-sm text-foreground bg-background border-1 border-secondar-background'> Save</button>
            <button className='rounded-md w-[50%] py-2 text-sm text-background bg-primary border-1'> Download</button>
        </div>
    </div>
  )
}

export default ResourceCard;    