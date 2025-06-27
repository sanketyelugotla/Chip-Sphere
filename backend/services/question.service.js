const { Question, Quiz } = require("../models");
const QuizAttempt = require("../models/QuizAttempt");
const mongoose = require("mongoose");

// 📌 Get all questions for a quiz
const getQuestions = async (quizId) => {
    try {
        const questions = await Question.find({ quizId })
            .select('-answer') // Don't send correct answers to client
            .sort({ createdAt: 1 });

        if (!questions.length) {
            throw new Error("No questions found for this quiz");
        }

        return questions;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching questions");
    }
};

// 📌 Get questions with answers (Admin only)
const getQuestionsWithAnswers = async (quizId) => {
    try {
        const questions = await Question.find({ quizId })
            .sort({ createdAt: 1 });

        return questions;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching questions with answers");
    }
};

// 📌 Get single question by ID
const getQuestion = async (questionId) => {
    try {
        const question = await Question.findById(questionId)
            .populate('quizId', 'title category level');

        if (!question) {
            throw new Error("Question not found");
        }

        return question;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching question");
    }
};

// 📌 Add questions to a quiz
const addQuestionsToQuiz = async (quizId, questionsData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Check if quiz exists
        const quiz = await Quiz.findById(quizId).session(session);
        if (!quiz) {
            throw new Error("Quiz not found");
        }

        // Validate questions data
        if (!Array.isArray(questionsData) || questionsData.length === 0) {
            throw new Error("Questions data must be a non-empty array");
        }

        // Create questions
        const questions = questionsData.map(questionData => ({
            quizId,
            title: questionData.title,
            options: questionData.options,
            answer: questionData.answer,
            type: questionData.type || 'mcq',
            explanation: questionData.explanation || '',
            difficulty: questionData.difficulty || 'medium',
            points: questionData.points || 1
        }));

        // Validate each question
        for (let question of questions) {
            if (!question.options.includes(question.answer)) {
                throw new Error(`Answer "${question.answer}" must be one of the provided options for question: "${question.title}"`);
            }
        }

        const savedQuestions = await Question.insertMany(questions, { session });

        // Update quiz questions count
        await Quiz.findByIdAndUpdate(
            quizId,
            { questions: savedQuestions.length },
            { session }
        );

        await session.commitTransaction();
        return savedQuestions;
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        throw new Error("Error adding questions to quiz");
    } finally {
        session.endSession();
    }
};

// 📌 Update a question
const updateQuestion = async (questionId, updateData) => {
    try {
        // Remove fields that shouldn't be updated directly
        delete updateData.quizId;
        delete updateData.createdAt;
        delete updateData.updatedAt;

        // Validate answer is in options if both are being updated
        if (updateData.answer && updateData.options) {
            if (!updateData.options.includes(updateData.answer)) {
                throw new Error("Answer must be one of the provided options");
            }
        }

        const question = await Question.findByIdAndUpdate(
            questionId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!question) {
            throw new Error("Question not found");
        }

        return question;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating question");
    }
};

// 📌 Delete a question
const deleteQuestion = async (questionId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const question = await Question.findByIdAndDelete(questionId).session(session);

        if (!question) {
            throw new Error("Question not found");
        }

        // Update quiz questions count
        const remainingQuestions = await Question.countDocuments({ quizId: question.quizId }).session(session);
        await Quiz.findByIdAndUpdate(
            question.quizId,
            { questions: remainingQuestions },
            { session }
        );

        await session.commitTransaction();
        return question;
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        throw new Error("Error deleting question");
    } finally {
        session.endSession();
    }
};

// 📌 Submit quiz answers and create quiz attempt
const submitQuizAnswers = async (quizId, userId, submittedAnswers, timeSpent = 0) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Get quiz and questions
        const quiz = await Quiz.findById(quizId).session(session);
        if (!quiz) {
            throw new Error("Quiz not found");
        }

        const questions = await Question.find({ quizId }).session(session);
        if (!questions.length) {
            throw new Error("No questions found for this quiz");
        }

        // Validate submitted answers
        if (!Array.isArray(submittedAnswers)) {
            throw new Error("Submitted answers must be an array");
        }

        // Calculate score
        let correctAnswers = 0;
        const answersWithResults = [];

        for (let question of questions) {
            const submittedAnswer = submittedAnswers.find(
                answer => answer.questionId === question._id.toString()
            );

            const isCorrect = submittedAnswer && submittedAnswer.selectedAnswer === question.answer;

            if (isCorrect) {
                correctAnswers++;
            }

            answersWithResults.push({
                questionId: question._id,
                questionTitle: question.title,
                questionOptions: question.options,
                selectedAnswer: submittedAnswer ? submittedAnswer.selectedAnswer : null,
                correctAnswer: question.answer,
                explanation: question.explanation || '',
                isCorrect,
                points: isCorrect ? (question.points || 1) : 0
            });
        }

        const totalQuestions = questions.length;
        const score = correctAnswers;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);

        // Create quiz attempt
        const quizAttempt = new QuizAttempt({
            user: userId,
            quiz: quizId,
            score,
            totalQuestions,
            percentage,
            timeSpent,
            answers: answersWithResults.map(answer => ({
                questionId: answer.questionId,
                selectedAnswer: answer.selectedAnswer,
                isCorrect: answer.isCorrect
            })),
            status: 'completed',
            completedAt: new Date()
        });

        await quizAttempt.save({ session });

        // Update quiz usersAttempted count
        await Quiz.findByIdAndUpdate(
            quizId,
            { $inc: { usersAttempted: 1 } },
            { session }
        );

        await session.commitTransaction();

        // Return results with explanations and detailed answers
        return {
            attemptId: quizAttempt._id,
            score,
            totalQuestions,
            percentage,
            timeSpent,
            status: 'completed',
            completedAt: quizAttempt.completedAt,
            quiz: {
                id: quiz._id,
                title: quiz.title,
                category: quiz.category,
                level: quiz.level
            },
            detailedResults: answersWithResults,
            summary: {
                correctAnswers,
                incorrectAnswers: totalQuestions - correctAnswers,
                skippedAnswers: answersWithResults.filter(answer => !answer.selectedAnswer).length
            }
        };
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        throw new Error("Error submitting quiz answers");
    } finally {
        session.endSession();
    }
};

// 📌 Get quiz attempt results with detailed answers
const getQuizAttemptResults = async (attemptId, userId) => {
    try {
        const attempt = await QuizAttempt.findOne({ _id: attemptId, user: userId })
            .populate('quiz', 'title description category level')
            .populate('answers.questionId', 'title options answer explanation');

        if (!attempt) {
            throw new Error("Quiz attempt not found");
        }

        return attempt;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching quiz attempt results");
    }
};

// 📌 Get quiz statistics
const getQuizStatistics = async (quizId) => {
    try {
        const stats = await QuizAttempt.aggregate([
            { $match: { quiz: mongoose.Types.ObjectId(quizId) } },
            {
                $group: {
                    _id: null,
                    totalAttempts: { $sum: 1 },
                    averageScore: { $avg: "$percentage" },
                    highestScore: { $max: "$percentage" },
                    lowestScore: { $min: "$percentage" },
                    averageTimeSpent: { $avg: "$timeSpent" }
                }
            }
        ]);

        return stats[0] || {
            totalAttempts: 0,
            averageScore: 0,
            highestScore: 0,
            lowestScore: 0,
            averageTimeSpent: 0
        };
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching quiz statistics");
    }
};

module.exports = {
    getQuestions,
    getQuestionsWithAnswers,
    getQuestion,
    addQuestionsToQuiz,
    updateQuestion,
    deleteQuestion,
    submitQuizAnswers,
    getQuizAttemptResults,
    getQuizStatistics
};