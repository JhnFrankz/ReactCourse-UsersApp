import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersPage = () => {

    const {
        users,
        visibleForm,
        isLoading,
        handlerOpenForm,
        getUsers,
    } = useUsers();

    const { login } = useAuth();

    useEffect(() => {
        getUsers(); // funcion para cargar los usuarios
    }, []);

    // si esta cargando se muestra un mensaje, sino el listado de usuarios
    if (isLoading) {
        return (
            <div className="container my-4 text-center">
                {/* <h4>Cargando ...</h4> */}
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

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