import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";

const initialUsers = [];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
};

const initialErrors = {
    username: '',
    password: '',
    email: '',
};

export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);

    const [errors, setErrors] = useState(initialErrors);

    const navigate = useNavigate();

    // esta función se ejecuta cuando se carga el componente
    // y se encarga de obtener los usuarios de la API
    // se actualiza users con los usuarios obtenidos en el contexto
    const getUsers = async () => {
        const result = await findAll();
        console.log(result);
        dispatch({
            type: 'loadingUsers',
            payload: result.data,
        });
    };

    const handlerAddUser = async (user) => {
        // console.log(user);
        let response;

        try {
            if (user.id === 0) {
                response = await save(user);
            } else {
                response = await update(user);
            }
            // el response es un axios response con la respuesta del backend

            dispatch({
                type: (user.id === 0) ? 'addUser' : 'updateUser',
                payload: response.data, // el data contiene el usuario
            });

            Swal.fire(
                (user.id === 0) ?
                    'Usuario creado' :
                    'Usuario actualizado',
                (user.id === 0) ?
                    'El usuario ha sido creado con éxito' :
                    'El usuario ha sido actualizado con éxito',
                'success'
            );

            handlerCloseForm();
            navigate('/users');
        } catch (error) {
            // si existe el error.response y el status es 400
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data);
            } else {
                //cualquier otro error no controlado lo lanzamos
                throw error;
            }
        }
    };

    const handlerRemoveUser = (id) => {
        // console.log(id);
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Cuidado, el usuario será eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id); // elimina el usuario de la API

                dispatch({
                    type: 'removeUser',
                    payload: id,
                });

                Swal.fire(
                    'Usuario Eliminado!',
                    'El usuario ha sido eliminado con éxito',
                    'success'
                )
            }
        })
    };

    const handlerUserSelectedForm = (user) => {
        // console.log(user);
        setVisibleForm(true);
        setUserSelected({ ...user });
    };

    const handlerOpenForm = () => {
        setVisibleForm(true);
    };

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
    };

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
    };
};