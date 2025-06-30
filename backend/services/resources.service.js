const { Resource } = require("../models");
const Download = require("../models/Download");
const mongoose = require("mongoose");

// 📌 Get all resources
const getResources = async ({ category, type, search, page = 1, limit = 10 } = {}) => {
    try {
        const query = {};

        if (category) {
            query.typeOfMaterial = category;
        }

        if (type) {
            query.typeOfFile = type;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const resources = await Resource.find(query)
            .populate("author", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Resource.countDocuments(query);

        return {
            resources,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalResources: total,
                hasNext: page * limit < total,
                hasPrev: page > 1
            }
        };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

// 📌 Add a new resource
const addResource = async ({ name, description, typeOfFile, typeOfMaterial, file, sizeOfFile, user }) => {
    try {
        const resource = new Resource({
            name,
            description,
            typeOfFile,
            typeOfMaterial,
            file,
            sizeOfFile,
            author: user._id,
        });

        const savedResource = await resource.save();
        await savedResource.populate("author", "name email");
        return savedResource;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

// 📌 Get resource by ID
const getResource = async (id) => {
    try {
        const resource = await Resource.findById(id)
            .populate("author", "name email institution");

        if (!resource) {
            throw new Error("Resource not found");
        }

        return resource;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

// 📌 Download resource (simple tracking)
const downloadResource = async (resourceId, userId) => {
    try {
        const resource = await Resource.findById(resourceId);

        if (!resource) {
            throw new Error("Resource not found");
        }

        // Create download record
        const download = new Download({
            user: userId,
            resource: resourceId
        });

        await download.save();

        // Increment download count
        resource.noOfDownloads += 1;
        await resource.save();

        return {
            resource: {
                id: resource._id,
                name: resource.name,
                typeOfFile: resource.typeOfFile,
                sizeOfFile: resource.sizeOfFile,
                noOfDownloads: resource.noOfDownloads
            },
            downloadUrl: resource.file
        };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

// 📌 Get download history for a resource
const getResourceDownloads = async (resourceId) => {
    try {
        const downloads = await Download.find({ resource: resourceId })
            .populate('user', 'name email')
            .sort({ downloadedAt: -1 });

        return downloads;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

// 📌 Get user's download history
const getUserDownloads = async (userId) => {
    try {
        const downloads = await Download.find({ user: userId })
            .populate('resource', 'name typeOfFile typeOfMaterial')
            .sort({ downloadedAt: -1 });

        return downloads;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

// 📌 Get popular resources
const getPopularResources = async (limit = 10) => {
    try {
        const resources = await Resource.find()
            .populate("author", "name")
            .sort({ noOfDownloads: -1 })
            .limit(parseInt(limit));

        return resources;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

// 📌 Update resource
const updateResource = async (id, updateData) => {
    try {
        delete updateData.noOfDownloads;
        delete updateData.author;

        const resource = await Resource.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate("author", "name email");

        if (!resource) {
            throw new Error("Resource not found");
        }

        return resource;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

// 📌 Delete resource
const deleteResource = async (id) => {
    try {
        const resource = await Resource.findByIdAndDelete(id);

        if (!resource) {
            throw new Error("Resource not found");
        }

        // Delete all download records for this resource
        await Download.deleteMany({ resource: id });

        return resource;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

module.exports = {
    getResources,
    addResource,
    getResource,
    downloadResource,
    getResourceDownloads,
    getUserDownloads,
    getPopularResources,
    updateResource,
    deleteResource
};