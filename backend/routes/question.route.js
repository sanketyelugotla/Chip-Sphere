const express = require("express");
const { questionService } = require("../services");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// 📌 Get all Questions for a quiz (shows explanations if user attempted)
router.get("/:quizId", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const result = await questionService.getQuestions(req.params.quizId, userId);
        res.status(200).json({
            success: true,
            message: "Questions fetched successfully",
            questions: result.questions,
            hasAttempted: result.hasAttempted,
            showAnswers: result.showAnswers
        });
    } catch (error) {
        console.error("Error Getting questions:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get single question by ID
router.get("/single/:questionId", authenticate, async (req, res) => {
    try {
        const question = await questionService.getQuestion(req.params.questionId);
        res.status(200).json({ success: true, message: "Question fetched successfully", question });
    } catch (error) {
        console.error("Error Getting question:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Add questions for a quiz (Admin only)
router.post("/:quizId", authenticateAdmin, async (req, res) => {
    try {
        const questions = await questionService.addQuestionsToQuiz(req.params.quizId, req.body.questions);
        res.status(201).json({ success: true, message: "Questions added successfully", questions });
    } catch (error) {
        console.error("Error adding Questions:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Update a question (Admin only)
router.put("/:questionId", authenticateAdmin, async (req, res) => {
    try {
        const question = await questionService.updateQuestion(req.params.questionId, req.body);
        res.status(200).json({ success: true, message: "Question updated successfully", question });
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Delete a question (Admin only)
router.delete("/:questionId", authenticateAdmin, async (req, res) => {
    try {
        await questionService.deleteQuestion(req.params.questionId);
        res.status(200).json({ success: true, message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Submit quiz answers and get results
router.post("/:quizId/submit", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const { answers, timeSpent } = req.body;

        const result = await questionService.submitQuizAnswers(req.params.quizId, userId, answers, timeSpent);
        res.status(200).json({ success: true, message: "Quiz submitted successfully", result });
    } catch (error) {
        console.error("Error submitting quiz:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📌 Get quiz attempt results with explanations
router.get("/:quizId/results/:attemptId", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const results = await questionService.getQuizAttemptResults(req.params.attemptId, userId);
        res.status(200).json({ success: true, message: "Quiz results fetched successfully", results });
    } catch (error) {
        console.error("Error getting quiz results:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;