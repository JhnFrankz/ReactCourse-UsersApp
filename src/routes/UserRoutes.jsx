import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { useUsers } from "../hooks/useUsers";
import { UserProvider } from "../context/UserProvider";

export const UserRoutes = ({ login, handlerLogout }) => {

    // todos los componentes que estén dentro de UserProvider van a tener acceso a los valores que se pasen en value
    return (
        <>
            <UserProvider>
                <Navbar login={login} handlerLogout={handlerLogout} />

                <Routes>
                    <Route path="users" element={<UsersPage />} />

                    <Route path="users/register" element={<RegisterPage />} />

                    <Route path="users/edit/:id" element={<RegisterPage />} />

                    <Route path="/" element={<Navigate to="/users" />} />
                </Routes>
            </UserProvider>
        </>
    );
};