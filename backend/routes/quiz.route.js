const express = require("express");
const { quizService } = require("../services");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// 📌 Get all quizzes
router.get("/", async (req, res) => {
    try {
        const { category, level, search, page, limit } = req.query;
        const userId = req.user ? req.user._id : null;
        const quizzes = await quizService.getQuizzes({ category, level, search, page, limit, userId });
        res.status(200).json({
            success: true,
            message: "Quizzes fetched successfully",
            quizzes
        });
    } catch (error) {
        console.error("Error Getting quizzes:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get all quizzes for authenticated users (with attempt status)
router.get("/my-quizzes", authenticate, async (req, res) => {
    try {
        const { category, level, search, page, limit } = req.query;
        const userId = req.user._id;
        const quizzes = await quizService.getQuizzes({ category, level, search, page, limit, userId });
        res.status(200).json({
            success: true,
            message: "Quizzes with attempt status fetched successfully",
            quizzes
        });
    } catch (error) {
        console.error("Error Getting quizzes:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get quiz by ID
router.get("/:id", authenticate, async (req, res) => {
    try {
        const quiz = await quizService.getQuiz(req.params.id);
        res.status(200).json({ success: true, message: "Quiz fetched successfully", quiz });
    } catch (error) {
        console.error("Error Getting quiz:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Add new quiz
router.post("/", authenticateAdmin, async (req, res) => {
    try {
        req.body.user = req.user;
        const quiz = await quizService.addQuiz(req.body);
        res.status(201).json({ success: true, message: "Quiz added successfully", quiz });
    } catch (error) {
        console.error("Error adding quiz:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Update quiz
router.put("/:id", authenticateAdmin, async (req, res) => {
    try {
        const quiz = await quizService.updateQuiz(req.params.id, req.body);
        res.status(200).json({ success: true, message: "Quiz updated successfully", quiz });
    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Delete quiz
router.delete("/:id", authenticateAdmin, async (req, res) => {
    try {
        await quizService.deleteQuiz(req.params.id);
        res.status(200).json({ success: true, message: "Quiz deleted successfully" });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get popular quizzes
router.get("/stats/popular", async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const quizzes = await quizService.getPopularQuizzes(limit);
        res.status(200).json({ success: true, message: "Popular quizzes fetched successfully", quizzes });
    } catch (error) {
        console.error("Error getting popular quizzes:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;