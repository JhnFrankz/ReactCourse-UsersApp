import axios from "axios";

export const loginUser = async ({ username, password }) => {
    try {
        // pasamos los datos del usuario al backend en el body de la petición
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
            username,
            password,
        });
    } catch (error) {
        throw error;
    }
};