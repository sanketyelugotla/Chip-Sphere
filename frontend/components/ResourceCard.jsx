import React from 'react';
import { FiDownload, FiSave } from 'react-icons/fi';
import { TbFileStack, TbFileTypePpt, TbFileTypePdf, TbFileTypeDocx } from "react-icons/tb";

function ResourceCard({ resource }) {
    const getFileIcon = (fileType) => {
        switch (fileType.toLowerCase()) {
            case 'pdf':
                return <TbFileTypePdf className='w-[70%] h-[70%] ' />;
            case 'docx':
                return <TbFileTypeDocx className='w-[70%] h-[70%] ' />;
            case 'ppt':
                return <TbFileTypePpt className='w-[70%] h-[70%] '/>;
            default:
                return <TbFileStack className='w-[70%] h-[70%] '/>;
        }
    };

    return (
        <div className="border border-border rounded-lg overflow-hidden shadow-sm bg-container-background hover:shadow-md transition-all duration-200">
            <div className="p-5 flex flex-col h-full">
                {/* Badges */}
                <div className="flex justify-between mb-4">
                    <span className="px-3 py-1 text-xs font-semibold capitalize rounded-full bg-primary/10 text-primary">
                        {resource.typeOfFile}
                    </span>
                    <span className="px-3 py-1 text-xs  font-semibold capitalize rounded-full bg-secondary text-secondary-foreground">
                        {resource.typeOfMaterial}
                    </span>
                </div>

                {/* File Icon and Name */}
                <div className="flex flex-col items-center gap-3 mb-4 flex-grow">
                    <div className="h-16 w-16 flex items-center justify-center">
                        {getFileIcon(resource.typeOfFile)}
                    </div>
                    <h3 className="text-lg font-bold text-center line-clamp-2">
                        {resource.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center line-clamp-3">
                        {resource.description}
                    </p>
                </div>

                {/* Meta Info */}
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>Size: {resource.SizeOfFIle}</span>
                    <span>{resource.noOfDownloads} downloads</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                    <button className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md border border-border hover:bg-secondary/20 transition">
                        <FiSave className="text-lg" />
                        Save
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md bg-primary text-background hover:bg-primary/90 transition">
                        <FiDownload className="text-lg" />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResourceCard;