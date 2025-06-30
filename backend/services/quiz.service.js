const { Quiz } = require("../models");
const Question = require("../models/Question");
const QuizAttempt = require("../models/QuizAttempt");
const mongoose = require("mongoose");

// 📌 Get all quizzes with filtering and pagination
const getQuizzes = async ({ category, level, search, page = 1, limit = 10, userId = null } = {}) => {
    try {
        const query = {};

        if (category) {
            query.category = category;
        }

        if (level) {
            query.level = level;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        let quizzes;
        let pagination = null;

        // If no filters provided, return all quizzes
        if (!category && !level && !search && page === 1 && limit === 10) {
            quizzes = await Quiz.find().populate("author", "name");
        } else {
            const skip = (page - 1) * limit;

            quizzes = await Quiz.find(query)
                .populate("author", "name email")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit));

            const total = await Quiz.countDocuments(query);

            pagination = {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalQuizzes: total,
                hasNext: page * limit < total,
                hasPrev: page > 1
            };
        }

        // If userId is provided, check attempt status for each quiz
        if (userId) {
            const quizIds = quizzes.map(quiz => quiz._id);

            // Get all attempts by this user for these quizzes
            const attempts = await QuizAttempt.find({
                user: userId,
                quiz: { $in: quizIds },
                status: 'completed'
            }).select('quiz _id');

            const attemptMap = new Map();
            attempts.forEach(attempt => {
                attemptMap.set(attempt.quiz.toString(), attempt._id.toString());
            });

            // Add attempted status and attemptId to each quiz
            quizzes = quizzes.map(quiz => {
                const quizObj = quiz.toObject();
                const quizIdStr = quiz._id.toString();
                if (attemptMap.has(quizIdStr)) {
                    quizObj.attempted = true;
                    quizObj.attemptId = attemptMap.get(quizIdStr);
                } else {
                    quizObj.attempted = false;
                    quizObj.attemptId = null;
                }
                return quizObj;
            });
        } else {
            // If no userId provided, set attempted to false for all quizzes
            quizzes = quizzes.map(quiz => {
                const quizObj = quiz.toObject();
                quizObj.attempted = false;
                return quizObj;
            });
        }
        // Return with or without pagination based on the query
        if (pagination) {
            return {
                quizzes,
                pagination
            };
        } else {
            return quizzes;
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

// 📌 Get quiz by ID
const getQuiz = async (quizId) => {
    try {
        const quiz = await Quiz.findById(quizId)
            .populate("author", "name email institution");

        if (!quiz) {
            throw new Error("Quiz not found");
        }

        return quiz;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

// 📌 Add new quiz
const addQuiz = async ({ title, description, duration, level, category, user }) => {
    try {
        const quiz = new Quiz({
            title,
            description,
            duration,
            level,
            category,
            author: user._id,
        });

        const saved = await quiz.save();
        await saved.populate("author", "name email");
        return saved;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

// 📌 Update quiz
const updateQuiz = async (quizId, updateData) => {
    try {
        // Remove fields that shouldn't be updated directly
        delete updateData.questions;
        delete updateData.usersAttempted;
        delete updateData.author;

        const quiz = await Quiz.findByIdAndUpdate(
            quizId,
            updateData,
            { new: true, runValidators: true }
        ).populate("author", "name email");

        if (!quiz) {
            throw new Error("Quiz not found");
        }

        return quiz;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

// 📌 Delete quiz
const deleteQuiz = async (quizId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const quiz = await Quiz.findByIdAndDelete(quizId).session(session);

        if (!quiz) {
            throw new Error("Quiz not found");
        }

        // Delete all questions for this quiz
        await Question.deleteMany({ quizId }).session(session);

        // Delete all quiz attempts for this quiz
        await QuizAttempt.deleteMany({ quiz: quizId }).session(session);

        await session.commitTransaction();
        return quiz;
    } catch (error) {
        await session.abortTransaction();
        console.log(error);
        throw new Error(error.message);
    } finally {
        session.endSession();
    }
};

// 📌 Get popular quizzes
const getPopularQuizzes = async (limit = 10) => {
    try {
        const quizzes = await Quiz.find()
            .populate("author", "name")
            .sort({ usersAttempted: -1 })
            .limit(parseInt(limit));

        return quizzes;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

const getAttempt = async (attemptId) => {
    try {
        const attempt = await QuizAttempt.findById(attemptId).populate({
            path: 'answers.questionId',
            model: 'Question',
            select: 'title options correctAnswer explanation' // include only necessary fields
        });

        return attempt;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

module.exports = {
    getQuizzes,
    getQuiz,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    getPopularQuizzes,
    getAttempt
};