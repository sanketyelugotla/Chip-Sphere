const { Resource } = require("../models");

// 📌 Get all resources
const getResources = async () => {
    try {
        const resources = await Resource.find().populate("author", "name");;
        return resources;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching resources");
    }
};  

// 📌 Add a new resources
const addResource = async ({ name, description, typeOfFile, file, sizeOfFile, user }) => {
    try {
        const resource = new Resource({
            name,
            description,
            typeOfFile,
            file,
            sizeOfFile,
            author: user._id,
        });

        const savedResource = await resource.save();
        return savedResource;
    } catch (error) {
        console.error(error);
        throw new Error("Error adding resource");
    }
};


module.exports = {
    getResources,
    addResource,
};
