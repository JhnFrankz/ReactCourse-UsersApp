import { useEffect, useState } from "react";
import { UserForm } from "../components/UserForm";
import { useParams } from "react-router-dom";

export const RegisterPage = ({ users = [], handlerAddUser, initialUserForm }) => {

    // el userSelected lo manejaremos con un estado propio del componente UserForm para no mezclarlo con el modal de edicion de usuarios
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const { id } = useParams();

    useEffect(() => {
        console.log('id', id);
        // si encuentra un usuario con el id que viene por parametro, lo asigna a la variable user, sino asigna el initialUserForm
        const user = users.find(u => u.id === id) || initialUserForm;
        setUserSelected(user);
    }, [id]);

    return (
        <>
            <div className="container my-4">
                <h4>{userSelected.id > 0 ? 'Editar' : 'Registrar'} Usuario</h4>

                <div className="row">
                    <div className="col">
                        <UserForm
                            userSelected={userSelected}
                            handlerAddUser={handlerAddUser}
                            initialUserForm={initialUserForm} />
                    </div>
                </div>
            </div>
        </>
    );
};