const authenticate = require("../middleware/authenticate");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const { resourcesService } = require("../services");
const express = require("express");
const router = express.Router();

// 📌 Get all resources
router.get("/", async (req, res) => {
    try {
        const { category, type, search, page, limit } = req.query;
        const resources = await resourcesService.getResources({ category, type, search, page, limit });
        res.status(200).json({ success: true, message: "Resources fetched successfully", resources });
    } catch (error) {
        console.error("Error Getting resources:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/my-resources", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const { category, type, search, page, limit } = req.query;

        const resources = await resourcesService.getResources({ category, type, search, page, limit, userId, includeSavedAndDownloaded: true });

        res.status(200).json({
            success: true,
            message: "Resources fetched successfully",
            resources
        });
    } catch (error) {
        console.error("Error Getting resources:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Add a new resource
router.post("/", authenticateAdmin, async (req, res) => {
    try {
        req.body.user = req.user;
        const resource = await resourcesService.addResource(req.body);
        res.status(201).json({ success: true, message: "Resource added successfully", resource });
    } catch (error) {
        console.error("Error adding resource:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get resource by ID
router.get("/:id", authenticate, async (req, res) => {
    try {
        const resource = await resourcesService.getResource(req.params.id);
        res.status(200).json({ success: true, message: "Resource details fetched successfully", resource });
    } catch (error) {
        console.error("Error Getting resource details:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Download resource
router.post("/download/:id", authenticate, async (req, res) => {
    try {
        const resourceId = req.params.id;
        const userId = req.user._id;

        const downloadResult = await resourcesService.downloadResource(resourceId, userId);

        res.status(200).json({
            success: true,
            message: "Resource downloaded successfully",
            downloadUrl: downloadResult.downloadUrl,
            resource: downloadResult.resource
        });
    } catch (error) {
        console.error("Error downloading resource:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get who downloaded a resource (Admin only)
router.get("/:id/downloads", authenticateAdmin, async (req, res) => {
    try {
        const downloads = await resourcesService.getResourceDownloads(req.params.id);
        res.status(200).json({
            success: true,
            message: "Resource downloads fetched successfully",
            downloads
        });
    } catch (error) {
        console.error("Error getting resource downloads:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get user's download history
router.get("/downloads/history", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const downloads = await resourcesService.getUserDownloads(userId);
        res.status(200).json({
            success: true,
            message: "Download history fetched successfully",
            downloads
        });
    } catch (error) {
        console.error("Error getting download history:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get popular resources
router.get("/stats/popular", async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const popularResources = await resourcesService.getPopularResources(limit);
        res.status(200).json({ success: true, message: "Popular resources fetched successfully", resources: popularResources });
    } catch (error) {
        console.error("Error getting popular resources:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Update resource (Admin only)
router.put("/:id", authenticateAdmin, async (req, res) => {
    try {
        const updatedResource = await resourcesService.updateResource(req.params.id, req.body);
        res.status(200).json({ success: true, message: "Resource updated successfully", resource: updatedResource });
    } catch (error) {
        console.error("Error updating resource:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Delete resource (Admin only)
router.delete("/:id", authenticateAdmin, async (req, res) => {
    try {
        await resourcesService.deleteResource(req.params.id);
        res.status(200).json({ success: true, message: "Resource deleted successfully" });
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;