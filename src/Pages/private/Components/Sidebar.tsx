import {
    Home,
    Inventory,
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
import GroupsIcon from '@mui/icons-material/Groups';
import {JSX, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import useSessionStore from "../../../store/useSessionStore";
import BadgeIcon from '@mui/icons-material/Badge'
import PeopleIcon from '@mui/icons-material/People';


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
        { icon: <BadgeIcon />, text: "Proveedores", path: "/Suppliers" },
        { icon: <Inventory />, text: "Inventario", path: "/Inventory" },
        { icon: <LocationCity />, text: "Departamentos", path: "/Deparment" },
        { icon: <PeopleIcon />, text: "Usuarios", path: "/Users" },
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

            {/*Empieza lista usuarios*/}
            <List>
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
                        <GroupsIcon />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Personal" />}
                    {!collapsed && (openProfile ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={openProfile} timeout="auto" unmountOnExit>
                    {profileItems.map((item) => (
                        <Tooltip title={item.text} placement="left">
                            <Box key={item.text} pl={collapsed ? 0 : 4}>
                                {renderItem(item)}
                            </Box>
                        </Tooltip>
                    ))}
                </Collapse>
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
                        <Settings />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Ajustes" />}
                    {!collapsed && (openProfile ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>

                <Collapse in={openProfile} timeout="auto" unmountOnExit>
                    {profileItems.map((item) => (
                        <Tooltip title={item.text} placement="left">
                            <Box key={item.text} pl={collapsed ? 0 : 4}>
                                {renderItem(item)}
                            </Box>
                        </Tooltip>
                    ))}
                </Collapse>

                <Box>{renderItem({ icon: <Logout />, text: "Cerrar sesión", path: "#", action: clearSession })}</Box>
            </List>
        </Drawer>
    );
}
