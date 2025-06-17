const { Project } = require("../models");

const getProjects = async () => {
    try {
        const projects = await Project.find()
            .populate("author", "name")

        return projects;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const addProject = async ({ title, image, description, category, hashtags = [], contributors = [], user }) => {
    try {
        const project = new Project({
            title,
            image,
            description,
            category,
            hashtags,
            contributors,
            date: new Date(),
            author: user._id
        });
        const saved = await project.save();
        return saved;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to add project");
    }
};

module.exports = {
    getProjects,
    addProject,
};
