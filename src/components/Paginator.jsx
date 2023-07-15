import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// pasamos por props la url para desacoplar el componente
export const Paginator = ({ url }) => {

    const { paginator } = useSelector(state => state.users);

    return (
        <>
            {paginator?.length === 0 || // si no hay usuarios no se muestra la paginacion
                <ul className="pagination">
                    {paginator.number == 0 || // si es la 1° pagina no se muestra el boton de anterior
                        <li className="page-item">
                            {/* esta es la ruta de react */}
                            <Link className="page-link" to={`${url}/${paginator.number - 1}`}>Atrás</Link>
                        </li>
                    }

                    <li className={paginator.first ? 'page-item disabled' : 'page-item'}>
                        <Link className="page-link" to={`${url}/0`}>Primera</Link>
                    </li>

                    <li className={paginator.last ? 'page-item disabled' : 'page-item'}>
                        <Link className="page-link" to={`${url}/${paginator.totalPages - 1}`}>Última</Link>
                    </li>

                    {paginator.number >= paginator.totalPages - 1 || // si es la ultima pagina no se muestra el boton de siguiente (-1 ya que paginator.number empieza en 0)
                        <li className="page-item">
                            {/* esta es la ruta de react */}
                            <Link className="page-link" to={`${url}/${paginator.number + 1}`}>Siguiente</Link>
                        </li>
                    }
                </ul>
            }
        </>
    );
};