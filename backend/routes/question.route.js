const express = require("express");
const { questionService } = require("../services");

const router = express.Router();

// Get all Questions for a quiz
router.get("/:id", async (req, res) => {
    try {
        const questions = await questionService.getQuestions(req.params.id);
        res.status(200).json({ success: true, message: "Questions fetched successfully", questions });
    } catch (error) {
        console.error("Error Getting questions:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

// Add questions for a quiz
router.put('/:id', async (req, res) => {
    try {
        const questions = await questionService.addQuestionsToQuiz(req.params.id, req.body.questions);
        res.status(200).json({ success: true, message: "Questions added successfully", questions });
    } catch (error) {
        console.error("Error adding Questions:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})

module.exports = router;
