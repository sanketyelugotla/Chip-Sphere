import axios from "axios"

const dbUri = process.env.NEXT_PUBLIC_DATABASE_URI;

export const getDashboard = async (token) => {
    try {
        const response = await axios.get(`${dbUri}/user/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response)
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const updateProfile = async (token, formData) => {
    try {
        const response = await axios.put(
            `${dbUri}/user/profile`,
            { formData },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}