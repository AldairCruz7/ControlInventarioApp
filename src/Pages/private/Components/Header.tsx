// Header.tsx
import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Box,
} from "@mui/material";
import { AccountCircle} from "@mui/icons-material";

interface HeaderProps {
    onToggleSidebar: () => void;
}

const Header = ({  }: HeaderProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ width: "100%", backgroundColor: "#1565C0" }}>
            <Toolbar>

                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>Control de Inventario</Typography>
                {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Control de Inventario
                </Typography>*/}

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
    );
};

export default Header;
