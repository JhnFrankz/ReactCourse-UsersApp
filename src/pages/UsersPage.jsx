import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";
import { useUsers } from "../hooks/useUsers";

export const UsersPage = () => {

    const {
        users,
        visibleForm,
        handlerOpenForm,
        getUsers,
    } = useUsers();

    const { login } = useContext(AuthContext);

    useEffect(() => {
        getUsers(); // funcion para cargar los usuarios
    }, []);

    return (
        <>
            {// si la izquierda es true, no se ejecuta la derecha
                !visibleForm ||
                <UserModalForm />
            }

            <div className="container my-4">
                <h2>Users App</h2>
                <div className="row">

                    <div className="col">

                        {(visibleForm || !login.isAdmin) ||
                            // el boton solo se muestra si no esta visible el formulario o si es admin
                            <button
                                className="btn btn-primary my-2"
                                onClick={handlerOpenForm}>
                                Nuevo Usuario
                            </button>
                        }

                        {
                            users.length === 0 ?
                                <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                                :
                                <UsersList />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}