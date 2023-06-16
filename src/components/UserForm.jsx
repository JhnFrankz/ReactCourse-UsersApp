import { useState } from "react";

const initialUserForm = {
    username: '',
    password: '',
    email: '',
};

export const UserForm = () => {

    const [userForm, setUserForm] = useState(initialUserForm);
    
    const { username, password, email } = userForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
            // propiedad computada sirve para que el nombre de la propiedad sea el valor de la variable name
        });
        console.log(userForm);
    };

    return (
        <form>
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
            <button
                className="btn btn-primary"
                type="submit">
                Crear
            </button>
        </form>
    );
};