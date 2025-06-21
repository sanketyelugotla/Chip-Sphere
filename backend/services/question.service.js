const { Question } = require("../models");

const getQuestions = async (quizId) => {
    if (!quizId) throw new Error("Quiz ID is required");

    const questions = await Question.find({ quizId }).select("-answer -explanation");
    return questions;
};

const addQuestionsToQuiz = async (quizId, questionsArray) => {
    if (!quizId) throw new Error("Quiz ID is required");
    if (!Array.isArray(questionsArray) || questionsArray.length === 0) throw new Error("Questions array is empty or invalid");

    const questionsWithQuizId = questionsArray.map(q => ({
        ...q,
        quizId,
    }));

    const insertedQuestions = await Question.insertMany(questionsWithQuizId);

    return insertedQuestions;
};

const checkAnswers = async (quizId, submittedAnswers) => {
    if (!quizId || !Array.isArray(submittedAnswers)) throw new Error("Quiz ID and answers are required");

    const questions = await Question.find({ quizId });

    let score = 0;
    const results = questions.map((q) => {
        const userAnswer = submittedAnswers.find(a => a.questionId === q._id.toString());
        const isCorrect = userAnswer && userAnswer.selected === q.answer;

        if (isCorrect) score++;

        return {
            questionId: q._id,
            correctAnswer: q.answer,
            selectedAnswer: userAnswer?.selected || null,
            isCorrect
        };
    });
    // console.log(results);
    return {
        totalQuestions: questions.length,
        attempted: submittedAnswers.length,
        correct: score,
        results
    };
};

module.exports = {
    getQuestions,
    addQuestionsToQuiz,
    checkAnswers,
};