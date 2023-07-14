import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";

// aqui se maneja el almacenamiento de la aplicacion
export const store = configureStore({
    reducer: {
        users: usersSlice.reducer, // users es el nombre del estado y usersSlice.reducer es el reducer
        auth: authSlice.reducer,
    },
});