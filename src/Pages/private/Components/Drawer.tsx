import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AccountCircle, Inventory, Home, PersonPin, LocationCity } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useSessionStore from "../../../store/useSessionStore.ts";

interface DrawerProps {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
}

const options = [
    { id: 1, route: "/", label: "Dashboard", icon: <Home /> },
    { id: 2, route: "/Suppliers", label: "Provedores", icon: <PersonPin /> },
    /*{ id: 3, route: "/reports", label: "Reportes", icon: <AccountCircle /> },*/
    { id: 4, route: "/Inventory", label: "Inventario", icon: <Inventory /> },
    { id: 5, route: "/Deparment", label: "Departamentos", icon: <LocationCity /> },
    { id: 6, route: "/Users", label: "Usuarios", icon: <PersonPin /> },
];

export default function AnchorTemporaryDrawer({ open, toggleDrawer }: DrawerProps) {
    const navigate = useNavigate();

    const { clearSession } = useSessionStore.getState()

    const handleNavigate = (route: string) => {
        navigate(route);
        toggleDrawer(false);
    };

    return (
        <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation">
                <List>
                    {options.map((option) => (
                        <ListItem key={option.id} disablePadding>
                            <ListItemButton onClick={() => handleNavigate(option.route)}>
                                <ListItemIcon>{option.icon}</ListItemIcon>
                                <ListItemText primary={option.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => clearSession()}>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="Cerrar sesión" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}
