const { Question, Quiz } = require("../models");
const QuizAttempt = require("../models/QuizAttempt");
const mongoose = require("mongoose");

// 📌 Get all questions for a quiz (with explanations if user attempted)
const getQuestions = async (quizId, userId = null) => {
    try {
        let hasAttempted = false;

        // Check if user has attempted this quiz (only if userId is provided)
        if (userId) {
            const attempt = await QuizAttempt.findOne({
                quiz: quizId,
                user: userId,
                status: 'completed'
            });
            hasAttempted = !!attempt;
        }

        let questions;

        if (hasAttempted) {
            // User has attempted - show everything including answers and explanations
            questions = await Question.find({ quizId })
                .sort({ createdAt: 1 });
        } else {
            // User hasn't attempted - hide answers and explanations
            questions = await Question.find({ quizId })
                .select('-answer -explanation')
                .sort({ createdAt: 1 });
        }

        if (!questions.length) {
            throw new Error("No questions found for this quiz");
        }

        return {
            questions,
            hasAttempted,
            showAnswers: hasAttempted
        };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
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
        throw new Error(error.message);
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
        throw new Error(error.message);
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

        // Update quiz questions count - get current total count
        const totalQuestions = await Question.countDocuments({ quizId }).session(session);
        await Quiz.findByIdAndUpdate(
            quizId,
            { questions: totalQuestions },
            { session }
        );

        await session.commitTransaction();
        return savedQuestions;
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        throw new Error(error.message);
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
        throw new Error(error.message);
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
        throw new Error(error.message);
    } finally {
        session.endSession();
    }
};

// 📌 Submit quiz answers and create quiz attempt
const submitQuizAnswers = async (quizId, userId, submittedAnswers, timeSpent) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const quiz = await Quiz.findById(quizId).session(session);
        if (!quiz) throw new Error("Quiz not found");

        const questions = await Question.find({ quizId }).session(session);
        console.log(quizId)

        // Calculate score
        let correctAnswers = 0;
        let skippedAnswers = 0;
        const answersWithResults = [];

        for (let question of questions) {
            const submittedAnswer = submittedAnswers.find(
                answer => answer.questionId === question._id.toString()
            );

            if (!submittedAnswer || !submittedAnswer.selectedAnswer) {
                // Skip this question
                skippedAnswers++;
                answersWithResults.push({
                    questionId: question._id,
                    questionTitle: question.title,
                    questionOptions: question.options,
                    selectedAnswer: null,
                    correctAnswer: question.answer,
                    explanation: question.explanation || '',
                    isCorrect: false,
                    points: 0
                });
                continue;
            }

            const isCorrect = submittedAnswer.selectedAnswer === question.answer;
            if (isCorrect) correctAnswers++;

            answersWithResults.push({
                questionId: question._id,
                questionTitle: question.title,
                questionOptions: question.options,
                selectedAnswer: submittedAnswer.selectedAnswer,
                correctAnswer: question.answer,
                explanation: question.explanation || '',
                isCorrect,
                points: isCorrect ? (question.points || 1) : 0
            });
        }
        console.log(questions)
        const totalQuestions = questions.length;
        const score = correctAnswers;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);

        // Check if user has an existing completed attempt
        let existingAttempt = await QuizAttempt.findOne({
            quiz: quizId,
            user: userId,
            status: 'completed'
        }).session(session);

        if (existingAttempt) {
            if (score > existingAttempt.score) {
                existingAttempt.score = score;
                existingAttempt.percentage = percentage;
                existingAttempt.answers = answersWithResults.map(answer => ({
                    questionId: answer.questionId,
                    selectedAnswer: answer.selectedAnswer,
                    isCorrect: answer.isCorrect
                }));
                existingAttempt.totalQuestions = totalQuestions;
                existingAttempt.timeSpent = timeSpent;
                existingAttempt.completedAt = new Date();

                await existingAttempt.save({ session });
            }

            await session.commitTransaction();

            return res.status(200).json({
                score: existingAttempt.score,
                totalQuestions: existingAttempt.totalQuestions,
                percentage: existingAttempt.percentage,
                timeSpent: existingAttempt.timeSpent,
                status: 'completed',
                completedAt: existingAttempt.completedAt,
                quiz: {
                    id: quiz._id,
                    title: quiz.title,
                    category: quiz.category,
                    level: quiz.level
                },
                detailedResults: answersWithResults,
                summary: {
                    correctAnswers,
                    incorrectAnswers: totalQuestions - correctAnswers - skippedAnswers,
                    skippedAnswers
                }
            });
        }

        // Create a new attempt if none exists
        const newAttempt = await QuizAttempt.create([{
            user: userId,
            quiz: quizId,
            score,
            totalQuestions,
            percentage,
            answers: answersWithResults.map(answer => ({
                questionId: answer.questionId,
                selectedAnswer: answer.selectedAnswer,
                isCorrect: answer.isCorrect
            })),
            timeSpent,
            completedAt: new Date(),
            status: 'completed'
        }], { session });

        await Quiz.findByIdAndUpdate(
            quizId,
            { $inc: { usersAttempted: 1 } },
            { session }
        );

        await session.commitTransaction();

        return {
            attemptId: newAttempt[0]._id,
            score: newAttempt[0].score,
            totalQuestions,
            percentage,
            timeSpent,
            status: 'completed',
            completedAt: newAttempt[0].completedAt,
            quiz: {
                id: quiz._id,
                title: quiz.title,
                category: quiz.category,
                level: quiz.level
            },
            detailedResults: answersWithResults,
            summary: {
                correctAnswers,
                incorrectAnswers: totalQuestions - correctAnswers - skippedAnswers,
                skippedAnswers
            }
        };

    } catch (error) {
        await session.abortTransaction();
        // console.error("Error submitting quiz:", error);
        throw new error(error.message)
    } finally {
        session.endSession();
    }
};

// 📌 Get quiz attempt results with detailed answers
const getQuizAttemptResults = async (attemptId, userId) => {
    try {
        const attempt = await QuizAttempt.findOne({ _id: attemptId, user: userId })
            .populate('quiz', 'title description category level')
            .populate({
                path: 'answers.questionId',
                select: 'title options answer explanation type'
            });

        if (!attempt) {
            throw new Error("Quiz attempt not found");
        }

        return attempt;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
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
        throw new Error(error.message);
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