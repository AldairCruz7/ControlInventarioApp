import { InventaryComponent } from "./components/InventaryComponent.tsx";
import { Button, Box } from "@mui/material";

export const InventoryScreen = () => {
    return (
        <>
            {/* ✅ Sección de botones bien organizada */}
            <Box sx={{ display: "flex", gap: 2, mb: 2, pt: 2}}>
                <Button variant="contained" color="primary">AGREGAR</Button>

            </Box>

            <InventaryComponent />
        </>
    );
};
