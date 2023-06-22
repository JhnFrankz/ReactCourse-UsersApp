import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

// si existe el login en el sessionStorage, se obtiene, sino se crea un objeto con los valores por defecto
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
};

export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = ({ username, password }) => {
        
        const isLogin = loginUser({ username, password });

        if (isLogin) {
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

            navigate('/users');
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