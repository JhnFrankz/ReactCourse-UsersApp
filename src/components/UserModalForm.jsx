import { UserForm } from "./UserForm";
import { useUsers } from "../hooks/useUsers";

export const UserModalForm = () => {

    const { userSelected, handlerCloseForm } = useUsers();

    return (
        <>
            <div className="abrir-modal animacion fadeIn">
                <div className="modal" style={{ display: "block" }} tabIndex={-1}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {userSelected.id > 0 ? 'Editar' : 'Crear'} Modal Usuarios
                                </h5>
                            </div>
                            <div className="modal-body">
                                <UserForm
                                    userSelected={userSelected}
                                    handlerCloseForm={handlerCloseForm} />
                                    {/* se pasan los props handlerCloseForm para que el boton cancelar del formulario pueda cerrar el modal y el userSelected para que el formulario sepa si esta editando o creando un usuario */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}