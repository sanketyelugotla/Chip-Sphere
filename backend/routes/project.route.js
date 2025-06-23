const express = require("express");
const { projectService } = require("../services");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await projectService.getProjects();
        res.status(200).json({ success: true, message: "Projects fetched successfully", projects });
    } catch (error) {
        console.error("Error Getting projects:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

// Get a project
router.get("/:id", authenticate, async (req, res) => {
    try {
        const project = await projectService.getProject(req.params.id);
        res.status(200).json({ success: true, message: "Project details fetched successfully", project });
    } catch (error) {
        console.error("Error Getting project details:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

// Add a project
router.put('/', authenticateAdmin, async (req, res) => {
    try {
        req.body.user = req.user;
        const project = await projectService.addProject(req.body);
        res.status(200).json({ success: true, message: "Project added successfully", project });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

module.exports = router;
