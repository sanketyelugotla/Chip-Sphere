import axios from "axios"

const dbUri = process.env.NEXT_PUBLIC_DATABASE_URI;

export const getResources = async () => {
    try {
        const response = await axios.get(`${dbUri}/resource`);
        // console.log(response)
        return response.data.resources;
    } catch (error) {
        return error;
    }
}   