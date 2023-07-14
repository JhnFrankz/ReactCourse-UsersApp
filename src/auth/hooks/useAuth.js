import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../../store/slices/auth/authSlice";

export const useAuth = () => {

    const dispatch = useDispatch();
    // traemos los valores del estado auth del store
    const {user, isAdmin, isAuth} = useSelector(state => state.auth);
    // const [login, dispatch] = useReducer(loginReducer, initialLogin);
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
            // tres formas de obtener username: claims.sub, claims.username y response.data.username
            const user = { username: claims.sub };

            dispatch(onLogin({ user, isAdmin: claims.isAdmin }));

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
        dispatch(onLogout())
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
    };

    return {
        login: {
            user,
            isAdmin,
            isAuth,
        },
        handlerLogin,
        handlerLogout,
    };
};