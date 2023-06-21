import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";

// si existe el login en el sessionStorage, se obtiene, sino se crea un objeto con los valores por defecto
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
};

export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);

    const handlerLogin = ({ username, password }) => {
        if (username === 'admin' && password === '12345') {
            // este objeto simula la respuesta del backend
            const user = { username: 'admin' };
            dispatch({
                type: 'login',
                payload: user,
            });

            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user,
            }));
        } else {
            Swal.fire('Error Login', 'Username o password inválidos', 'error');
        }
    };

    // handler para cerrar sesión, se llama desde el componente UsersPage
    const handlerLogout = () => {
        // llama al reducer con el type logout y payload undefined para que se reinicie el estado del login
        dispatch({
            type: 'logout',
        });

        sessionStorage.removeItem('login');
    };

    return {
        login,
        handlerLogin,
        handlerLogout,
    };
};