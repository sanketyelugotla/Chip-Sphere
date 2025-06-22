import axios from "axios"

const dbUri = process.env.NEXT_PUBLIC_DATABASE_URI;

export const getBlogs = async () => {
    try {
        const response = await axios.get(`${dbUri}/blog`);
        // console.log(response.data.quizzes)
        return response.data.blogs;
    } catch (error) {
        return error;
    }
}

export const getBlog = async (id) => {
    try {
        const response = await axios.get(`${dbUri}/blog/${id}`);
        console.log(response.data);
        return response.data.blog;
    } catch (error) {
        return error;
    }
}
