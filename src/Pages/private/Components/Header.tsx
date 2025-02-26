import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box } from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import AnchorTemporaryDrawer from "./Drawer.tsx";



const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="static" sx={{ width: "100%", backgroundColor: "#1565C0" }}>
                <Toolbar>
                    {/* 📌 Botón de hamburguesa para abrir el Drawer */}
                    <IconButton onClick={() => setDrawerOpen(true)} color="inherit" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Control de Inventario
                    </Typography>

                    <Box>
                        <IconButton onClick={handleMenuOpen} color="inherit">
                            <Avatar sx={{ width: 32, height: 32 }}>
                                <AccountCircle />
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Configuración</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* 📌 Drawer para el menú lateral */}
            <AnchorTemporaryDrawer open={drawerOpen} toggleDrawer={setDrawerOpen} />
        </>
    );
};

export default Header;
