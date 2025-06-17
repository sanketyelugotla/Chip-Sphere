const { Quiz } = require("../models");


const getQuizzes = async () => {
    try {
        const quizzes = await Quiz.find().populate("author", "name");
        return quizzes;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

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
