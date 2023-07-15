import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useSelector } from "react-redux";

export const AppRoutes = () => {

    // const { login } = useAuth();
    const { isAuth, isLoginLoading } = useSelector(state => state.auth);
    // se podria tener un useEffect que haga una peticion a la api para ver si el token es valido cada x tiempo

    if (isLoginLoading) {
        return (
            <div className="container my-4 text-center">
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            {
                isAuth
                    ? (
                        // si está logueado muestra la navbar y las rutas de usuario
                        <Route path="/*"
                            element={<UserRoutes />} />
                    )
                    : <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path='/*' element={<Navigate to="/login" />} />
                    </> // si no esta logueado lo redirecciona a la pagina de login en caso de que quiera acceder a otra ruta
            }
        </Routes>
    );
};