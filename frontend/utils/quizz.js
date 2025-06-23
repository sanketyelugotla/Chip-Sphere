import axios from "axios"

const dbUri = process.env.NEXT_PUBLIC_DATABASE_URI;

export const getQuizzes = async (email, password) => {
    try {
        const response = await axios.get(`${dbUri}/quiz`);
        // console.log(response.data.quizzes)
        return response.data.quizzes;
    } catch (error) {
        return error;
    }
}

export const getQuestions = async (id, token) => {
    try {
        const response = await axios.get(`${dbUri}/question/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let questions = response.data.questions;

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        questions = questions.map((question) => {
            return {
                ...question,
                options: shuffleArray([...question.options])
            };
        });


        questions = shuffleArray(questions);

        return questions;
    } catch (error) {
        console.error("Error fetching questions:", error);
        return error;
    }
};


export const submitAnswers = async (id, answers) => {
    console.log(answers)
    try {
        const response = await axios.post(`${dbUri}/question/${id}`, { answers });
        return response.data;
    } catch (error) {
        return error;
    }
}