const express = require("express");
const { blogService } = require("../services");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const { getBlog } = require("../services/blog.service");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await blogService.getBlogs();
        res.status(200).json({ success: true, message: "Blogs fetched successfully", blogs });
    } catch (error) {
        console.error("Error Getting blogs:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

router.get("/:id", authenticate, async (req, res) => {
    try {
        const blog = await blogService.getBlog(req.params.id);
        res.status(200).json({ success: true, message: "Blog fetched successfully", blog });
    } catch (error) {
        console.error("Error Getting blog:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

// Add a blog
router.put('/', authenticateAdmin, async (req, res) => {
    try {
        const blog = await blogService.addBlog(req.body);
        res.status(200).json({ success: true, message: "Blog added successfully", blog });
    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

module.exports = router;
