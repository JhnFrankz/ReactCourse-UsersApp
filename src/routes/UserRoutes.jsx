import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { useAuth } from "../auth/hooks/useAuth";

export const UserRoutes = () => {

    const { login } = useAuth();

    // todos los componentes que estén dentro de UserProvider van a tener acceso a los valores que se pasen en value
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="users" element={<UsersPage />} />
                {
                    !login.isAdmin ||
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