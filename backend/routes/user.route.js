const authenticate = require("../middleware/authenticate");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const { userService } = require("../services");
const express = require("express");
const router = express.Router();

// 📌 Get all users (Admin only)
router.get("/", authenticateAdmin, async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json({ success: true, message: "Users fetched successfully", users });
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get user profile (with saved resources and quiz attempts)
router.get("/profile", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const profile = await userService.getUserProfile(userId);
        res.status(200).json({ success: true, message: "Profile fetched successfully", profile });
    } catch (error) {
        console.error("Error getting user profile:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Update user profile
router.put("/profile", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const updatedUser = await userService.updateUser(userId, req.body);
        res.status(200).json({ success: true, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Update user by ID (Admin only)
router.put("/:id", authenticateAdmin, async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Delete user (Admin only)
router.delete("/:id", authenticateAdmin, async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Save a resource
router.post("/save-resource", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const { resourceId } = req.body;

        const result = await userService.saveResource(userId, resourceId);

        if (result.success) {
            res.status(200).json({ success: true, message: "Resource saved successfully" });
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        console.error("Error saving resource:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Unsave a resource
router.delete("/save-resource/:resourceId", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const { resourceId } = req.params;

        await userService.unsaveResource(userId, resourceId);
        res.status(200).json({ success: true, message: "Resource unsaved successfully" });
    } catch (error) {
        console.error("Error unsaving resource:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get user's saved resources
router.get("/saved-resources", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const savedResources = await userService.getSavedResources(userId);
        res.status(200).json({ success: true, message: "Saved resources fetched successfully", savedResources });
    } catch (error) {
        console.error("Error getting saved resources:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Check if resource is saved
router.get("/check-saved/:resourceId", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const { resourceId } = req.params;

        const isSaved = await userService.isResourceSaved(userId, resourceId);
        res.status(200).json({ success: true, isSaved });
    } catch (error) {
        console.error("Error checking saved resource:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get user's quiz attempts
router.get("/quiz-attempts", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10 } = req.query;

        const quizAttempts = await userService.getUserQuizAttempts(userId, page, limit);
        res.status(200).json({ success: true, message: "Quiz attempts fetched successfully", quizAttempts });
    } catch (error) {
        console.error("Error getting quiz attempts:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get user's quiz statistics
router.get("/quiz-stats", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const stats = await userService.getUserQuizStats(userId);
        res.status(200).json({ success: true, message: "Quiz statistics fetched successfully", stats });
    } catch (error) {
        console.error("Error getting quiz statistics:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get user's dashboard data (summary)
router.get("/dashboard", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const dashboardData = await userService.getUserDashboard(userId);
        res.status(200).json({ success: true, message: "Dashboard data fetched successfully", dashboard: dashboardData });
    } catch (error) {
        console.error("Error getting dashboard data:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Change password
router.put("/change-password", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const { currentPassword, newPassword } = req.body;

        await userService.changePassword(userId, currentPassword, newPassword);
        res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get user activity (recent actions)
router.get("/activity", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const { limit = 20 } = req.query;

        const activities = await userService.getUserActivity(userId, limit);
        res.status(200).json({ success: true, message: "User activity fetched successfully", activities });
    } catch (error) {
        console.error("Error getting user activity:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get user's created content (blogs, projects, quizzes)
router.get("/my-content", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const content = await userService.getUserContent(userId);
        res.status(200).json({ success: true, message: "User content fetched successfully", content });
    } catch (error) {
        console.error("Error getting user content:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get specific user by ID
router.get("/:id", authenticate, async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.status(200).json({ success: true, message: "User details fetched successfully", user });
    } catch (error) {
        console.error("Error getting user details:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Export the router
module.exports = router;