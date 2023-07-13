import axios from "axios";

const usersApi = axios.create({
    baseURL: "http://localhost:8080/users"
});

// interceptors es una funcion que se ejecuta antes de cada peticion
// en este caso se encarga de añadir el token en el header de la peticion
// para que el backend sepa que usuario esta haciendo la peticion
// y asi poder comprobar si tiene permisos para hacerla
usersApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers, // viene por defecto el content-type
        'Authorization': sessionStorage.getItem('token'),
    };

    return config;
});

export default usersApi;