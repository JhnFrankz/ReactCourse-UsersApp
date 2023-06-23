import { useContext, useEffect, useState } from "react";
import { UserForm } from "../components/UserForm";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const RegisterPage = () => {

    const { users = [], initialUserForm } = useContext(UserContext);
    // el userSelected lo manejaremos con un estado propio del componente UserForm para no mezclarlo con el modal de edicion de usuarios
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const { id } = useParams(); // obtengo el id que viene por parametro en la url
    // tener en cuenta que el id viene como string, por eso en el useEffect lo comparo con == y no con ===

    // cada vez que cambie el id, se ejecuta el useEffect
    useEffect(() => {
        console.log('id', id);
        if (id) {
            // si encuentra un usuario con el id que viene por parametro, lo asigna a la variable user, sino asigna el initialUserForm
            const user = users.find(u => u.id == id) || initialUserForm;
            setUserSelected(user);
        }
    }, [id]);

    return (
        <>
            <div className="container my-4">
                <h4>{userSelected.id > 0 ? 'Editar' : 'Registrar'} Usuario</h4>

                <div className="row">
                    <div className="col">
                        <UserForm
                            userSelected={userSelected} />
                            {/* se le pasa el userSelected como prop al componente UserForm para que el componente UserForm sepa si tiene que editar o registrar un usuario y no se pasa el handlerCloseForm porque el componente UserForm no tiene que cerrar el modal, sino que el componente UserModalForm lo tiene que cerrar */}
                    </div>
                </div>
            </div>
        </>
    );
};