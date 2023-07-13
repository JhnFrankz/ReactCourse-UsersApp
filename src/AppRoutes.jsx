import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";

export const AppRoutes = () => {

    const { login } = useContext(AuthContext);
    // se podria tener un useEffect que haga una peticion a la api para ver si el token es valido cada x tiempo

    return (
        <Routes>
            {
                login.isAuth
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