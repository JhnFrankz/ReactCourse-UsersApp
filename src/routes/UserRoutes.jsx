import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { useSelector } from "react-redux";

export const UserRoutes = () => {

    const { isAdmin } = useSelector(state => state.auth);

    // todos los componentes que estén dentro de UserProvider van a tener acceso a los valores que se pasen en value
    return (
        <>
            <Navbar />

            <Routes>
                {/* Si se llama a /users el page por defecto es 0 */}
                <Route path="users" element={<UsersPage />} />
                <Route path="users/page/:page" element={<UsersPage />} />
                {
                    !isAdmin ||
                    <>
                        <Route path="users/register" element={<RegisterPage />} />
                        <Route path="users/edit/:id" element={<RegisterPage />} />
                    </>
                }
                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </>
    );
};