import { createSlice } from "@reduxjs/toolkit";

// si existe el login en el sessionStorage, se obtiene, sino se crea un objeto con los valores por defecto
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined,
    isLoginLoading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialLogin,
    reducers: {
        onLogin: (state, action) => {
            state.isAuth = true;
            state.isAdmin = action.payload.isAdmin;
            state.user = action.payload.user;
            state.isLoginLoading = false; // cuando termine de cargar el login
        },
        onLogout: (state) => {
            state.isAuth = false;
            state.isAdmin = false;
            state.user = undefined;
            state.isLoginLoading = false;
        },
        onInitLogin: (state) => {
            state.isLoginLoading = true;
        },
    },
});

export const {
    onLogin,
    onLogout,
    onInitLogin,
} = authSlice.actions;