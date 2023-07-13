import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUser, errors } = useContext(UserContext);
    const [userForm, setUserForm] = useState(initialUserForm);
    const [checked, setChecked] = useState(userForm.admin);

    const { id, username, password, email, admin } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: '',
        });
    }, [userSelected]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
            // propiedad computada sirve para que el nombre de la propiedad sea el valor de la variable name
        });
    };

    const onCheckboxChange = () => {
        setChecked(!checked);

        // hacemos setUserForm para actualizar el estado del userForm
        setUserForm({
            // hacemos ...userForm para que no perder las propiedades que ya tenia
            ...userForm,
            admin: checked,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        /* if (!username || (!password && id === 0) || !email) {
            Swal.fire(
                'Error de validación',
                'Debe completar todos los campos del formulario!',
                'error'
            );
            return;
        }

        if (!email.includes('@')) {
            Swal.fire(
                'Error de validación email',
                'El email debe ser válido, incluir un @!',
                'error'
            );
            return;
        } */
        // console.log(userForm);

        // funciona porque el componente padre UsersApp le pasa el handlerAddUser como prop, y el componente hijo UserForm lo recibe como prop, es decir, el componente hijo UserForm recibe una funcion como prop, y esa funcion es la que se ejecuta cuando se hace submit del formulario
        // guardar el userForm en el lista de usuarios
        handlerAddUser(userForm);
    };

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onInputChange} />
            <p className="text-danger">{errors?.username}</p>

            {
                id > 0 || <input
                    className="form-control my-3 w-75"
                    placeholder="Password"
                    name="password"
                    value={password}
                    type="password"
                    onChange={onInputChange} />
            }
            <p className="text-danger">{errors?.password}</p>

            <input
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
            <p className="text-danger">{errors?.email}</p>

            <div className="my-3 form-check">
                <input type="checkbox"
                    name="admin"
                    checked={admin}
                    className="form-check-input"
                    onChange={onCheckboxChange}
                />

            </div>

            <input
                type="hidden"
                name="id"
                value={id} />

            <button
                className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>

            { // cuando se pasa la prop handlerCloseForm, se muestra el boton cerrar ya que es modal
                !handlerCloseForm || <button
                    className="btn btn-primary mx-2"
                    type="button"
                    onClick={() => onCloseForm()}>
                    Cerrar
                </button>}
        </form>
    );
};