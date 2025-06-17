const authenticateAdmin = require("../middleware/authenticateAdmin");
const { resourcesService } = require("../services");
const express = require("express");
const router = express.Router();

// 📌 Get all resources
router.get("/", async (req, res) => {
    try {
        const resources = await resourcesService.getResources();
        res.status(200).json({ success: true, message: "Resources fetched successfully", resources });
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

// Export the router
module.exports = router;