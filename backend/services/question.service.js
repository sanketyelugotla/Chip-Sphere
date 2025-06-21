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

module.exports = {
    getQuestions,
    addQuestionsToQuiz,
};