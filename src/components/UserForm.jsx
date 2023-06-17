import { useEffect, useState } from "react";

export const UserForm = ({ userSelected, handlerAddUser, initialUserForm }) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const { id, username, password, email } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            // password: '',
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

    const onSubmit = (event) => {
        event.preventDefault();

        if (!username || !password || !email) {
            alert('Debe completar todos los campos');
            return;
        }
        // console.log(userForm);

        // funciona porque el componente padre UsersApp le pasa el handlerAddUser como prop, y el componente hijo UserForm lo recibe como prop, es decir, el componente hijo UserForm recibe una funcion como prop, y esa funcion es la que se ejecuta cuando se hace submit del formulario
        // guardar el userForm en el lista de usuarios
        handlerAddUser(userForm);
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
            <input
                className="form-control my-3 w-75"
                placeholder="Password"
                name="password"
                value={password}
                type="password"
                onChange={onInputChange} />
            <input
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
            <input
                type="hidden"
                name="id"
                value={id} />
            <button
                className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>
        </form>
    );
};