const express = require("express");
const { questionService } = require("../services");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Get all Questions for a quiz
router.get("/:id", authenticate, async (req, res) => {
    try {
        const questions = await questionService.getQuestions(req.params.id);
        res.status(200).json({ success: true, message: "Questions fetched successfully", questions });
    } catch (error) {
        console.error("Error Getting questions:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

// Add questions for a quiz
router.put('/:id', authenticateAdmin, async (req, res) => {
    try {
        const questions = await questionService.addQuestionsToQuiz(req.params.id, req.body.questions);
        res.status(200).json({ success: true, message: "Questions added successfully", questions });
    } catch (error) {
        console.error("Error adding Questions:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

// Check submitted answers for a quiz
router.post('/:id', authenticate, async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        const result = await questionService.checkAnswers(req.params.id, req.body.answers);
        res.status(200).json({ success: true, message: "Answers evaluated", result });
    } catch (error) {
        console.error("Error checking answers:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
