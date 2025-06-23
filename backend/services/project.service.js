const { Project } = require("../models");

const getProjects = async () => {
    try {
        const projects = await Project.find().populate("author", "name")
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

const getProject = async (id) => {
    try {
        const project = await Project.findById(id).populate("author", "name");
        if (!project) throw new Error("Project not found");
        return project;
    } catch (error) {
        console.error("Error fetching project:", error.message);
        throw new Error("Failed to fetch project");
    }
}

module.exports = {
    getProjects,
    addProject,
    getProject,
};
