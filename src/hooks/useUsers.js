import { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { AuthContext } from "../auth/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { initialUserForm, addUser, loadingUsers, onCloseForm, onOpenForm, onUserSelectedForm, removeUser, updateUser, loadingError } from "../store/slices/users/usersSlice";

export const useUsers = () => {

    const { users, userSelected, visibleForm, errors } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { login, handlerLogout } = useContext(AuthContext);

    // esta función se ejecuta cuando se carga el componente
    // y se encarga de obtener los usuarios de la API
    // se actualiza users con los usuarios obtenidos en el contexto
    const getUsers = async () => {

        try {
            const result = await findAll();
            console.log(result);
            // type es el nombre de la función y el payload es el parámetro
            dispatch(loadingUsers(result.data));
        } catch (error) {
            if (error.response?.status === 401) {
                handlerLogout();
            }
        }
    };

    const handlerAddUser = async (user) => {
        // si no es admin no puede crear usuarios
        if (!login.isAdmin) return;

        let response;

        try {
            if (user.id === 0) {
                // parte asincrona que va al backend
                response = await save(user);
                // parte sincrona que actualiza el estado segun la respuesta del backend 
                dispatch(addUser(response.data));
            } else {
                response = await update(user);
                dispatch(updateUser(response.data));
            }
            // el response es un axios response con la respuesta del backend

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
                dispatch(loadingError(error.response.data));
            } else if (error.response && error.response.status === 500 &&
                error.response.data?.message?.includes('constraint')) {

                if (error.response.data?.message?.includes('UK_username')) {
                    dispatch(loadingError({ username: 'El username ya existe!' }));
                }
                if (error.response.data?.message?.includes('UK_email')) {
                    dispatch(loadingError({ email: 'El email ya existe!' }));
                }
            } else if (error.response?.status === 401) {
                handlerLogout();
            } else {
                //cualquier otro error no controlado lo lanzamos
                throw error;
            }
        }
    };

    const handlerRemoveUser = (id) => {

        if (!login.isAdmin) return;
        // console.log(id);
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Cuidado, el usuario será eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id); // elimina el usuario de la API

                    dispatch(removeUser(id));

                    Swal.fire(
                        'Usuario Eliminado!',
                        'El usuario ha sido eliminado con éxito',
                        'success'
                    )
                } catch (error) {
                    if (error.response?.status === 401) {
                        handlerLogout();
                    }
                }
            }
        })
    };

    const handlerUserSelectedForm = (user) => {
        dispatch(onUserSelectedForm({ ...user }));
    };

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    };

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
        dispatch(loadingError({}));
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