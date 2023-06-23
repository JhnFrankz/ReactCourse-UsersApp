import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const initialLoginForm = {
    username: '',
    password: '',
};

export const LoginPage = () => {

    const { handlerLogin } = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm, // para que no se pierda el valor de la otra propiedad, por ejemplo si se escribe en el input de password, no se pierde el valor de username
            [name]: value, // para que se actualice el valor de la propiedad que se esta escribiendo
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Error de validación', 'Username y password requeridos', 'error');
        }

        handlerLogin({ username, password });

        setLoginForm(initialLoginForm);
    };

    return (
        <>
            <div className="modal" style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login Page</h5>
                        </div>

                        <form onSubmit={onSubmit}>
                            <div className="modal-body">
                                <input
                                    className="form-control my-3 w-75"
                                    placeholder="Username"
                                    name="username"
                                    value={username}
                                    onChange={onInputChange} />
                                <input
                                    className="form-control my-3 w-75"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onInputChange} />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    className="btn btn-primary">Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};