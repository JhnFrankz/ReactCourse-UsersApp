import { UserRow } from "./UserRow";

export const UsersList = ({ handlerUserSelectedForm, handlerRemoveUser, users = [] }) => {

    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Update</th>
                    <th>Update Route</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {
                    // usamos las llaves anteriores para que el return sea explicito
                    // usamos parentesis para que el return sea implicito y no sea necesario escribirlo
                    users.map(({ id, username, email }) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                            handlerUserSelectedForm={handlerUserSelectedForm}
                            handlerRemoveUser={handlerRemoveUser} />
                    ))
                    // ; da error porque no es un elemento jsx valido y no se puede renderizar en el navegador
                    // no podemos usar console.log() dentro de un return porque no es un elemento JSX valido, los elementos jsx validos son los que se pueden renderizar en el navegador
                }
            </tbody>

        </table>
    );
};