const { Quiz } = require("../models");


const getQuizzes = async () => {
    try {
        const quizzes = await Quiz.find();
        return quizzes;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const addQuiz = async ({ name, description, duration, level, category, user }) => {
    try {
        const quiz = new Quiz({
            name,
            description,
            duration,
            level,
            category,
            author: user._id,
        });

        const saved = await quiz.save();
        return saved;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    getQuizzes,
    addQuiz,
};
