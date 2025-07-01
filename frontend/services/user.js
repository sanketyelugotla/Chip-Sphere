import axios from "axios";

const dbUri = process.env.NEXT_PUBLIC_DATABASE_URI;

export const getSavedResources = async (token) => {
  try {
    const response = await axios.get(`${dbUri}/user/saved-resources`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.savedResources;
  } catch (error) {
    console.error("Error fetching saved resources:", error);
    throw new Error(error.response ? error.response.data.message : "Network error");
  }
};
