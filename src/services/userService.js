import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

// el config es para enviar el token en el header de las peticiones
const config = {
    headers: {
        "Authorization": sessionStorage.getItem("token"),
        "Content-Type": "application/json",
    }
}

export const findAll = async () => {

    try {
        const response = await axios.get(BASE_URL);
        return response;
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const save = async ({ username, email, password }) => {
    try {
        return await axios.post(BASE_URL, {
            username,
            email,
            password,
        }, config);
    } catch (error) {
        throw error;
    }

};

export const update = async ({ id, username, email }) => {
    try {
        return await axios.put(`${BASE_URL}/${id}`, {
            username,
            email,
            // esto da igual, el backend no lo usa
            // password: 'nothing', 
        }, config);
    } catch (error) {
        throw error;
    }

}

export const remove = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, config)
    } catch (error) {
        console.log(error);
    }
};