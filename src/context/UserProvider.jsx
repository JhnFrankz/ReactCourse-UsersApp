import { useUsers } from "../hooks/useUsers";
import { UserContext } from "./UserContext";

// pasamos el children para que se pueda renderizar el componente que se le pase como hijo
export const UserProvider = ({ children }) => {

    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
    } = useUsers();
    // el useUsers() solamente se ejecutará una vez

    // children es el componente que se le pase como hijo
    // los valores que se pasen en value van a estar disponibles para todos los componentes que estén dentro de UserProvider como una especie de repositorio global
    return (
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                visibleForm,
                handlerAddUser,
                handlerRemoveUser,
                handlerUserSelectedForm,
                handlerOpenForm,
                handlerCloseForm,
            }
        }>
            {children}
        </UserContext.Provider>
    );
};