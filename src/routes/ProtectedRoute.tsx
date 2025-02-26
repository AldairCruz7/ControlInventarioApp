import { Navigate, Outlet, useLocation } from "react-router-dom";
import useSessionStore from "../store/useSessionStore.ts";
import Header from "../Pages/private/Components/Header.tsx";


const ProtectedRoute = () => {
    const { status, isTokenChecked } = useSessionStore();
    const location = useLocation();
    if (!isTokenChecked) {
        return <div>Cargando...</div>;
    }

    if (status === "loggedIn") {
        return (
            <>
                <Header />
                <Outlet />
            </>
        );
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
