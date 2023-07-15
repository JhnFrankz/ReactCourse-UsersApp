import usersApi from "../apis/usersApi";

const BASE_URL = ''; // no hace falta poner nada porque ya lo tenemos en el usersApi

export const findAll = async () => {
    try {
        const response = await usersApi.get(BASE_URL);
        return response;
    } catch (error) {
        throw error;
    }
};

export const findAllPages = async (page = 0) => {
    try {
        const response = await usersApi.get(`${BASE_URL}/page/${page}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const save = async ({ username, email, password, admin }) => {
    try {
        return await usersApi.post(BASE_URL, {
            username,
            email,
            password,
            admin,
        });
    } catch (error) {
        throw error;
    }

};

export const update = async ({ id, username, email, admin }) => {
    try {
        return await usersApi.put(`${BASE_URL}/${id}`, {
            username,
            email,
            admin,
            // esto da igual, el backend no lo usa
            // password: 'nothing', 
        });
    } catch (error) {
        throw error;
    }

}

export const remove = async (id) => {
    try {
        await usersApi.delete(`${BASE_URL}/${id}`)
    } catch (error) {
        // en caso de error devolvemos el error para hacer logout
        throw error;
    }
};