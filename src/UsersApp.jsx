import { Provider } from "react-redux";
import { AppRoutes } from "./AppRoutes";
import { store } from "./store/store";

export const UsersApp = () => {

    return (
        // el provider es el que se encarga de proveer el store a toda la aplicacion
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    );
}