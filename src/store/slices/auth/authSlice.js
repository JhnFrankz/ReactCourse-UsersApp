import { createSlice } from "@reduxjs/toolkit";

// si existe el login en el sessionStorage, se obtiene, sino se crea un objeto con los valores por defecto
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialLogin,
    reducers: {
        onLogin: (state, action) => {
            state.isAuth = true;
            state.isAdmin = action.payload.isAdmin;
            state.user = action.payload.user;
        },
        onLogout: (state) => {
            state.isAuth = false;
            state.isAdmin = false;
            state.user = undefined;
        },
    },
});

export const {
    onLogin,
    onLogout,
} = authSlice.actions;