'use client'

import React, { useState } from 'react';
import { FiDownload, FiSave } from 'react-icons/fi';
import { TbFileStack, TbFileTypePpt, TbFileTypePdf, TbFileTypeDocx } from "react-icons/tb";
import { saveResource, unSaveResource, getResource, downloadResource } from '@/services/resources';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function ResourceCard({ resource }) {
    const token = Cookies.get("token");
    const [localResource, setLocalResource] = useState(resource);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDownload, setLoadingDownload] = useState(false);

    const getFileIcon = (fileType) => {
        switch (fileType?.toLowerCase()) {
            case 'pdf':
                return <TbFileTypePdf className='w-[70%] h-[70%]' />;
            case 'docx':
                return <TbFileTypeDocx className='w-[70%] h-[70%]' />;
            case 'ppt':
                return <TbFileTypePpt className='w-[70%] h-[70%]' />;
            default:
                return <TbFileStack className='w-[70%] h-[70%]' />;
        }
    };

    async function handleSave() {
        if (!token) {
            router.push(`/auth?mode=login&redirect=${encodeURIComponent(pathname)}`);
        }
        try {
            setLoadingSave(true);

            if (localResource.isSaved) {
                await unSaveResource(token, localResource._id);
                setLocalResource(prev => ({ ...prev, isSaved: false }));
            } else {
                await saveResource(token, localResource._id);
                setLocalResource(prev => ({ ...prev, isSaved: true }));
            }

            // Optionally refresh with latest state (non-blocking)
            // getResource(token, localResource._id).then(updated => {
            //     setLocalResource(updated);
            // });

        } catch (err) {
            console.error("Error saving resource:", err.message);
            if (err.message == "Invalid or expired token.") router.push(`/auth?mode=login&redirect=${encodeURIComponent(pathname)}`);
            else if (err.message == "Resource already saved") toast.warning(err.message)
        } finally {
            setLoadingSave(false);
        }
    }

    async function handleDownload() {
        try {
            setLoadingDownload(true);
            await downloadResource(token, localResource._id);

            // Optimistically update download state
            setLocalResource(prev => ({
                ...prev,
                isDownloaded: true,
                noOfDownloads: (prev.noOfDownloads || 0) + 1
            }));

            // getResource(token, localResource._id).then(updated => {
            //     setLocalResource(updated);
            // });

        } catch (err) {
            console.error("Error downloading resource:", err);
        } finally {
            setLoadingDownload(false);
        }
    }

    return (
        <div className="border border-border rounded-lg overflow-hidden shadow-sm bg-container-background hover:shadow-md transition-all duration-200">
            <div className="p-5 flex flex-col h-full">
                {/* Badges */}
                <div className="flex justify-between mb-4">
                    <span className="px-3 py-1 text-xs font-semibold capitalize rounded-full bg-primary/10 text-primary">
                        {localResource.typeOfFile}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold capitalize rounded-full bg-secondary text-secondary-foreground">
                        {localResource.typeOfMaterial}
                    </span>
                </div>

                {/* File Icon and Name */}
                <div className="flex flex-col items-center gap-3 mb-4 flex-grow">
                    <div className="h-16 w-16 flex items-center justify-center">
                        {getFileIcon(localResource.typeOfFile)}
                    </div>
                    <h3 className="text-lg font-bold text-center line-clamp-2">
                        {localResource.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center line-clamp-3">
                        {localResource.description}
                    </p>
                </div>

                {/* Meta Info */}
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>Size: {localResource.SizeOfFIle}</span>
                    <span>{localResource.noOfDownloads} downloads</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                    <button
                        onClick={handleSave}
                        disabled={loadingSave}
                        className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md border border-border hover:bg-secondary/20 transition cursor-pointer ${loadingSave ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <FiSave className="text-lg" />
                        {loadingSave ? 'Saving...' : localResource.isSaved ? 'Un Save' : 'Save'}
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={loadingDownload}
                        className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md bg-primary text-white hover:bg-primary/90 transition cursor-pointer ${loadingDownload ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <FiDownload className="text-lg" />
                        {loadingDownload ? 'Downloading...' : localResource.isDownloaded ? 'Download again' : 'Download'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResourceCard;
