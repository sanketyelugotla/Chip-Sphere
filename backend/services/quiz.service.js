const { Quiz } = require("../models");


// 📌 Register User
const getQuizzes = async () => {
    try {
        const quizzes = await Quiz.find();
        return quizzes;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const addQuiz = async ({ name, description, duration, level, subject }) => {
    try {
        console.log(name)
        const quiz = new Quiz({
            name,
            description,
            duration,
            level,
            subject,
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
