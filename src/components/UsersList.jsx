import { UserRow } from "./UserRow";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = () => {

    const { users } = useUsers();
    const { login } = useAuth();

    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    {
                        !login.isAdmin ||
                        <>
                            <th>Update</th>
                            <th>Update Route</th>
                            <th>Remove</th>
                        </>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    // usamos las llaves anteriores para que el return sea explicito
                    // usamos parentesis para que el return sea implicito y no sea necesario escribirlo
                    users.map(({ id, username, email, admin }) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            email={email} 
                            admin={admin} />
                    ))
                    // ; da error porque no es un elemento jsx valido y no se puede renderizar en el navegador
                    // no podemos usar console.log() dentro de un return porque no es un elemento JSX valido, los elementos jsx validos son los que se pueden renderizar en el navegador
                }
            </tbody>

        </table>
    );
};