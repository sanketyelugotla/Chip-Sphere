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

export const getQuestions = async (id) => {
    console.log(id, "called")
    try {
        const response = await axios.get(`${dbUri}/question/${id}`);
        // console.log(response.data.questions)
        return response.data.questions;
    } catch (error) {
        return error;
    }
}