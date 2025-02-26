import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import useSessionStore from "./store/useSessionStore";
import {CommonNotification} from "./Pages/private/Components/Notification/CommonNotification.tsx";


const App = () => {
    const { validateToken, isTokenChecked } = useSessionStore();

    useEffect(() => {
        if (!isTokenChecked) {
            validateToken().then(() => console.log("🔄 Validando sesión"));
        }
    }, [isTokenChecked, validateToken]);

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <CommonNotification /> {/* ✅ Se mantiene en el nivel global */}
            <AppRoutes />
        </div>
    );
};

export default App;
