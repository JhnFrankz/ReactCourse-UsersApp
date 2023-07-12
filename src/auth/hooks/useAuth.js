import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

// si existe el login en el sessionStorage, se obtiene, sino se crea un objeto con los valores por defecto
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined,
};

export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    // handler para el login, se llama desde el componente LoginPage
    const handlerLogin = async ({ username, password }) => {

        try {
            // response contiene el data que contiene el token
            const response = await loginUser({ username, password });
            const token = response.data.token;
            // se decodifica el token para obtener los claims (payload)
            const claims = JSON.parse(window.atob(token.split('.')[1]));
            console.log(claims);
            const user = { username: claims.username };

            dispatch({
                type: 'login',
                payload: { user, isAdmin: claims.isAdmin },
            });

            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));
            // guardamos el token para luego enviarlo en el header de las peticiones
            sessionStorage.setItem('token', `Bearer ${token}`);

            navigate('/users');
        } catch (error) {
            if (error.response?.status === 401) {
                Swal.fire('Error Login', 'Username o password inválidos', 'error');
            } else if (error.response?.status === 403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso o permisos', 'error');
            } else {
                throw error;
            }
        }
    };

    // handler para cerrar sesión, se llama desde el componente UsersPage
    const handlerLogout = () => {
        // llama al reducer con el type logout y payload undefined para que se reinicie el estado del login
        dispatch({
            type: 'logout',
        });

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
    };

    return {
        login,
        handlerLogin,
        handlerLogout,
    };
};