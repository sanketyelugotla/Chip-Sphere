import axios from "axios"

const dbUri = process.env.NEXT_PUBLIC_DATABASE_URI;

export const userDetails = async (token) => {
    try {
        const res = await axios.get(`${dbUri}/auth/details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        return error;
    }
  };

export const signin = async (email, password) => {
    try {
        const response = await axios.post(`${dbUri}/auth/login`, {
            email,
            password
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const signup = async (name, email, education, institution, password, role) => {
    try {
        const response = await axios.post(`${dbUri}/auth/register`, {
            name,
            email,
            education,
            institution,
            password,
            role
        });
        return response;
    } catch (error) {
        return error;
    }
}
