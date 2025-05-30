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

