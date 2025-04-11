import {
    Home,
    Inventory,
    PersonPin,
    LocationCity,
    AccountCircle,
    Logout,
    Settings,
    Menu as MenuIcon,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Collapse,
    Typography,
} from "@mui/material";
import {JSX, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import useSessionStore from "../../../store/useSessionStore";

interface SidebarProps {
    collapsed: boolean;
    toggleCollapse: () => void;
}

interface MenuItemConfig {
    icon: JSX.Element;
    text: string;
    path: string;
    action?: () => void;
}


export default function Sidebar({ collapsed, toggleCollapse }: SidebarProps) {
    const { clearSession } = useSessionStore.getState();
    const location = useLocation();
    const [openProfile, setOpenProfile] = useState(false);

    const menuItems: MenuItemConfig[] = [
        { icon: <Home />, text: "Dashboard", path: "/" },
        { icon: <PersonPin />, text: "Proveedores", path: "/Suppliers" },
        { icon: <Inventory />, text: "Inventario", path: "/Inventory" },
        { icon: <LocationCity />, text: "Departamentos", path: "/Deparment" },
        { icon: <PersonPin />, text: "Usuarios", path: "/Users" },
    ];

    const profileItems: MenuItemConfig[] = [
        { icon: <AccountCircle />, text: "Mi perfil", path: "#" },
        { icon: <Settings />, text: "Configuración", path: "#" },
    ];


    const drawerWidth = collapsed ? 80 : 270;

    const renderItem = ({ icon, text, path, action }: MenuItemConfig) => {
        const isActive = location.pathname === path;

        const button = (
            <ListItemButton
                component={Link}
                to={path}
                selected={isActive}
                onClick={action}
                sx={{
                    justifyContent: collapsed ? "center" : "flex-start",
                    px: 2,
                    py: 1,
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: collapsed ? "auto" : 40,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }}
                >
                    {icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={text} />}
            </ListItemButton>
        );

        return collapsed ? (
            <Tooltip key={text} title={text} placement="right">
                {button}
            </Tooltip>
        ) : (
            button
        );
    };

    return (
        <Drawer
            variant="permanent"
            PaperProps={{
                sx: {
                    width: drawerWidth,
                    overflowX: "hidden",
                    boxSizing: "border-box",
                    transition: "width 0.3s",
                    whiteSpace: "nowrap",
                },
            }}
        >
            <Box
                height={64}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <IconButton onClick={toggleCollapse}>
                    <MenuIcon />
                </IconButton>
            </Box>

            {!collapsed && (
                <Box px={2} pb={1}>
                    <Typography variant="h1" mt={1}>
                        (LOGO)
                    </Typography>
                    <Typography variant="h6" mt={1}>
                        Inventario
                    </Typography>
                </Box>
            )}

            <List>
                {!collapsed && (
                    <Typography variant="caption" px={2}>
                        NAVEGACIÓN
                    </Typography>
                )}
                {menuItems.map((item) => (
                    <Box key={item.text}>{renderItem(item)}</Box>
                ))}
            </List>

            <List>
                {!collapsed && (
                    <Typography variant="caption" px={2}>
                        AJUSTES
                    </Typography>
                )}

                <ListItemButton
                    onClick={() => setOpenProfile(!openProfile)}
                    sx={{
                        justifyContent: collapsed ? "center" : "flex-start",
                        px: 2,
                        py: 1,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: collapsed ? "auto" : 40,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        <AccountCircle />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Perfil" />}
                    {!collapsed && (openProfile ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>

                <Collapse in={openProfile} timeout="auto" unmountOnExit>
                    {profileItems.map((item) => (
                        <Box key={item.text} pl={collapsed ? 0 : 4}>
                            {renderItem(item)}
                        </Box>
                    ))}
                </Collapse>

                <Box>{renderItem({ icon: <Logout />, text: "Cerrar sesión", path: "#", action: clearSession })}</Box>
            </List>
        </Drawer>
    );
}
