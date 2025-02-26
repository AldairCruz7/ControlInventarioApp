import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/private/Home/Home.tsx";
import Login from "../Pages/public/Login.tsx";
import NotFound from "../Pages/private/NotFound.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import useSessionStore from "../store/useSessionStore.ts";
import {InventoryScreen} from "../Pages/private/Inventory/InventoryScreen.tsx";
import {SuppliersScreen} from "../Pages/private/Suppliers/SuppliersScreen.tsx";
import DepartmentScreen from "../Pages/private/Deparments/DepartmentScreen.tsx";
import UserScreen from "../Pages/private/Users/UserScreen";

const AppRoutes = () => {
    const { status, isTokenChecked } = useSessionStore();
    if (!isTokenChecked) {
        return <div>Cargando sesión...</div>;
    }

    return (
        <Routes>
            <Route
                path="/login"
                element={status === "loggedIn" ? <Navigate to="/" replace /> : <Login />}
            />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/Inventory" element={<InventoryScreen/>}/>
                <Route path="/Suppliers" element={<SuppliersScreen/>}/>
                <Route path="/Deparment" element={<DepartmentScreen/>} />
                <Route path="/Users" element={<UserScreen/>} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
