import { useEffect, useState, useRef } from "react";
import { getUsers } from "../services/UserService.ts";
import { closeNotification, showNotification } from "../../Components/Notification/CommonNotification.tsx";
import { Button, Box } from "@mui/material";
import CommonTable from "../../Components/tables/commonTable.tsx";

const UsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const isProcessing = useRef(false);

    const getAllUsers = async () => {
        try {
            showNotification("loading", "Consultando datos...");
            const data = await getUsers();
            setUsers(data);
            closeNotification();
            showNotification("success", "Carga completada");
        } catch (error) {
            console.error("Error cargando usuarios:", error);
            closeNotification();
            showNotification("error", "Error al cargar usuarios");
        } finally {
            setLoading(false);
            isProcessing.current = false;
        }
    };

    const handleProcess = async () => {
        if (isProcessing.current) return;
        isProcessing.current = true;

        setLoading(true);
        await getAllUsers();
    };

    useEffect(() => {
        handleProcess();
    }, []);

    return (
        <div>
            <Box sx={{ display: "flex", gap: 2, mb: 2, pt: 2}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={getAllUsers}
                >
                    Actualizar
                </Button>
                <Button variant="contained" color="primary">AGREGAR</Button>

            </Box>
            {loading ? <p>Cargando...</p> : <CommonTable data={users} />}
        </div>
    );
};

export default UsersComponent;
