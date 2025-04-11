import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./routes/AppRoutes";
import useSessionStore from "./store/useSessionStore";
import { CommonNotification } from "./Pages/private/Components/Notification/CommonNotification.tsx";
import theme from "./theme/theme";
import "@fontsource/inter/index.css";
import "@fontsource/inter";


const App = () => {
    const { validateToken, isTokenChecked } = useSessionStore();

    useEffect(() => {
        if (!isTokenChecked) {
            validateToken().then(() => console.log("🔄 Validando sesión"));
        }
    }, [isTokenChecked, validateToken]);

    if (import.meta.env.MODE === 'development') {
        console.log("🧪 MODE:", import.meta.env.MODE);
        console.log("🔗 VITE_API_URL:", import.meta.env.VITE_API_URL);

    } else {
        console.log("🧪 MODE:", import.meta.env.MODE);
        console.log("🔗 VITE_API_URL:", import.meta.env.VITE_API_URL);

    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <CommonNotification />
                <AppRoutes />
            </div>
        </ThemeProvider>
    );
};

export default App;
