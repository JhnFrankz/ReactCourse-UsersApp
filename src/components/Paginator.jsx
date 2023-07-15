import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Paginator = () => {

    const { paginator } = useSelector(state => state.users);

    return (
        <>
            {paginator?.length === 0 || // si no hay usuarios no se muestra la paginacion
                <ul className="pagination">
                    {paginator.number == 0 || // si es la 1° pagina no se muestra el boton de anterior
                        <li className="page-item">
                            {/* esta es la ruta de react */}
                            <Link className="page-link" to={`/users/page/${paginator.number - 1}`}>Atrás</Link>
                        </li>
                    }

                    {paginator.number >= paginator.totalPages - 1 || // si es la ultima pagina no se muestra el boton de siguiente (-1 ya que paginator.number empieza en 0)
                        <li className="page-item">
                            {/* esta es la ruta de react */}
                            <Link className="page-link" to={`/users/page/${paginator.number + 1}`}>Siguiente</Link>
                        </li>
                    }
                </ul>
            }
        </>
    );
};