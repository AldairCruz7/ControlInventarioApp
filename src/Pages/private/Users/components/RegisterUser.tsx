import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Typography,
    TextField,
    FormControl, InputLabel, Select, MenuItem, FormHelperText
} from "@mui/material";
import { useState } from "react";

export const RegisterUser = ({ open, handleClose, handleAccept }) => {
    const [role, setRole] = useState('');

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <Box sx={{ backgroundColor: "primary.main"}}>
                <DialogTitle sx={{ fontWeight: "bold", color: "white" }}>Registro de Usuario</DialogTitle>
            </Box>
            <DialogContent sx={{ padding: 3 }}>
                <Typography variant="body1">Completa los datos del formulario para registrar un nuevo usuario.</Typography>
                <TextField required label="Nombres" variant="filled" fullWidth margin="normal" />
                <FormHelperText>Nombres del usuario</FormHelperText>
                <TextField required label="Email" variant="filled" fullWidth margin="normal" />
                <FormHelperText>Correo electrónico del usuario</FormHelperText>
                <TextField required label="Teléfono" variant="filled" fullWidth margin="normal" />
                <FormHelperText>Número de contacto del usuario</FormHelperText>
                <TextField required label="Nombre" variant="filled" fullWidth margin="normal" />
                <FormHelperText>Nombre del usuario</FormHelperText>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Rol</InputLabel>
                    <Select value={role} onChange={handleChange}>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>Rol del usuario</FormHelperText>
                </FormControl>
            </DialogContent>
            <Box sx={{ backgroundColor: "#f5f5f5", padding: 2, display: "flex", justifyContent: "flex-end" }}>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">Cancelar</Button>
                    <Button onClick={handleAccept} color="primary" variant="contained">
                        Aceptar
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
