import { useState } from "react";
import { UserForm } from "../components/UserForm";

export const RegisterPage = ({ handlerAddUser, initialUserForm }) => {

    // el userSelected lo manejaremos con un estado propio del componente UserForm para no mezclarlo con el modal de edicion de usuarios
    const { userSelected, setUserSelected } = useState(initialUserForm);

    return (
        <>
            <div className="container my-4">
                <h4>Registro de Usuarios</h4>

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