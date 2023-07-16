import { Link } from "react-router-dom";

// pasamos por props la url y paginator para reutilizar el componente
export const Paginator = ({ url, paginator }) => {

    return (
        <>
            {paginator?.totalPages == 1 || // si hay una sola pagina no se muestra la paginacion
                <ul className="pagination">

                    <li className={paginator.first ? 'page-item disabled' : 'page-item'}>
                        <Link className="page-link" to={`${url}/0`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                            </svg>
                        </Link>
                    </li>

                    {paginator.number == 0 || // si es la 1° pagina no se muestra el boton de anterior
                        <li className="page-item">
                            {/* esta es la ruta de react */}
                            <Link className="page-link" to={`${url}/${paginator.number - 1}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                </svg>
                            </Link>
                        </li>
                    }

                    {paginator.number >= paginator.totalPages - 1 || // si es la ultima pagina no se muestra el boton de siguiente (-1 ya que paginator.number empieza en 0)
                        <li className="page-item">
                            {/* esta es la ruta de react */}
                            <Link className="page-link" to={`${url}/${paginator.number + 1}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </Link>
                        </li>
                    }

                    <li className={paginator.last ? 'page-item disabled' : 'page-item'}>
                        <Link className="page-link" to={`${url}/${paginator.totalPages - 1}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
                                <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </Link>
                    </li>

                </ul>
            }
        </>
    );
};