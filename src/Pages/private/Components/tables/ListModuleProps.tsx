import * as React from "react";
import { closeNotification, showNotification } from "../Notification/CommonNotification.tsx";
import { Button, Box } from "@mui/material";
import CommonTable from "../../Components/tables/commonTable.tsx";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import type { ReactNode } from "react";
import {useEffect, useRef, useState} from "react";

interface ListModuleProps {
    fetchFunction: () => Promise<any[]>;
    title: string;
    modalComponent?: ReactNode;
    onOpenModal?: () => void;
    showAddButton?: boolean;
}

const ListModule = ({
                        fetchFunction,
                        title = "Listado",
                        modalComponent,
                        onOpenModal,
                        showAddButton = true
                    }: ListModuleProps) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const isProcessing = useRef<boolean>(false);

    const getAllData = async () => {
        try {
            showNotification("loading", `Consultando ${title.toLowerCase()}...`);
            const result = await fetchFunction();
            setData(result);
            closeNotification();
            showNotification("success", "Carga completada");
        } catch (error) {
            console.error(`Error cargando ${title.toLowerCase()}:`, error);
            closeNotification();
            showNotification("error", `Error al cargar ${title.toLowerCase()}`);
        } finally {
            setLoading(false);
            isProcessing.current = false;
        }
    };

    const handleProcess = async () => {
        if (isProcessing.current) return;
        isProcessing.current = true;

        setLoading(true);
        await getAllData();
    };

    const renderAddButton = (): React.JSX.Element | null => {
        if (!showAddButton || !onOpenModal) return null;

        return (
            <Button
                variant="outlined"
                color="primary"
                onClick={onOpenModal}
                startIcon={<AddIcon />}
            >
                Agregar
            </Button>
        );
    };

    useEffect(() => {
        handleProcess().then()
    }, []);

    return (
        <div>
            <Box sx={{ display: "flex", gap: 2, mb: 2, pt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={getAllData}
                    startIcon={<UpdateIcon />}
                >
                    Actualizar
                </Button>

                {renderAddButton()}
            </Box>

            {loading ? <p>Cargando...</p> : <CommonTable data={data} />}
            {modalComponent ?? null}
        </div>
    );
};

export default ListModule;
