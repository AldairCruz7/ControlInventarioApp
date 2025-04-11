import { Navigate, Outlet, useLocation } from "react-router-dom";
import useSessionStore from "../store/useSessionStore.ts";


const ProtectedRoute = () => {
    const { status, isTokenChecked } = useSessionStore();
    const location = useLocation();

    if (!isTokenChecked) {
        return <div>Cargando...</div>;
    }

    if (status === "loggedIn") {
        return <Outlet />; // ✅ Deja que Layout maneje el header
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};


export default ProtectedRoute;
