const express = require("express");
const { quizService } = require("../services");
const authenticateAdmin = require("../middleware/authenticateAdmin");

const router = express.Router();

// Get all quizzes
router.get("/", async (req, res) => {
    try {
        const quizzes = await quizService.getQuizzes();
        res.status(200).json({ success: true, message: "Quizzes fetched successfully", quizzes });
    } catch (error) {
        console.error("Error Getting quizzes:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

router.put('/', authenticateAdmin, async (req, res) => {
    try {
        const quiz = await quizService.addQuiz(req.body);
        res.status(200).json({ success: true, message: "Quiz added successfully", quiz });
    } catch (error) {
        console.error("Error adding quizz:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

module.exports = router;
