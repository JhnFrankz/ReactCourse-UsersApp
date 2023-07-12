import axios from "axios";

export const loginUser = async ({ username, password }) => {
    try {
        // pasamos los datos del usuario al backend en el body de la petición
        return await axios.post('http://localhost:8080/login', {
            username,
            password,
        });
    } catch (error) {
        throw error;
    }
};