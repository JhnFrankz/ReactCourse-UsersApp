import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
    },
    reducers: {
        addUser: (state, action) => {
            state.users = [
                ...state.users, // esparcir los usuarios que ya estaban
                {
                    ...action.payload, // esparcir el usuario que se agrega
                }
            ];
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            state.users = state.users.map(u => {
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                    };
                }
                return u;
            });
        },
        loadingUsers: (state, action) => {
            state.users = action.payload; // action.payload es array de users
        },
    },
});

export const {
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
} = usersSlice.actions;
