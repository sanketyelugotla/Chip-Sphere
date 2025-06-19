import axios from "axios";

const dbUri = process.env.NEXT_PUBLIC_DATABASE_URI;

export const getProjects = async (email, password) => {
    try {
        const response = await axios.get(`${dbUri}/project`);
        return response.data.projects;
    } catch (error) {
        return error;
    }
}