import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
};

const initialErrors = {
    username: '',
    password: '',
    email: '',
};

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        paginator: {},
        userSelected: initialUserForm,
        visibleForm: false,
        errors: initialErrors,
        isLoading: true,
    },
    reducers: {
        addUser: (state, action) => {
            state.users = [
                ...state.users, // esparcir los usuarios que ya estaban
                {
                    ...action.payload, // esparcir el usuario que se agrega
                }
            ];
            state.userSelected = initialUserForm; // reiniciar el formulario
            state.visibleForm = false; // ocultar el formulario
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
            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },
        loadingUsers: (state, { payload }) => {
            state.users = payload.content; // payload es el objeto pagineable
            state.paginator = payload;
            state.isLoading = false; // cuando termina de cargar los usuarios
        },
        onUserSelectedForm: (state, { payload }) => {
            state.userSelected = payload;
            state.visibleForm = true;
        },
        onOpenForm: (state) => {
            state.visibleForm = true;
        },
        onCloseForm: (state) => {
            state.visibleForm = false;
            state.userSelected = initialUserForm;
        },
        loadingError: (state, { payload }) => {
            state.errors = payload;
        },
    },
});

export const {
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
} = usersSlice.actions;
