import * as React from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
    TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import { AccountCircle, Email, Phone, Lock, Business, Work } from "@mui/icons-material";
import {getDepartments} from "../../Deparments/services/DepartmentService.ts";

type RegisterUserProps = {
    open: boolean;
    handleClose: () => void;
};

export const RegisterUser = ({ open, handleClose }: RegisterUserProps) => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        cellphoneNumber: "",
        password: "",
        role: "EMPLOYEE",
        departmentId: ""
    });

    const [departments, setDepartments] = useState<any[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const getAllDepartments = async () => {
        const response = await getDepartments();
        setDepartments(response);
    }

    const handleSubmit = () => {
        console.log("Form submitted:", form);
    };

    useEffect(() => {
        getAllDepartments().then()
    }, []);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ backgroundColor: "primary.main", color: "white", fontWeight: "bold" }}>
                Registro de Usuario
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                <Typography mb={2}>Completa los datos del formulario.</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="username"
                            label="Nombre de usuario"
                            fullWidth
                            value={form.username}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="email"
                            label="Correo electrónico"
                            type="email"
                            fullWidth
                            value={form.email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="cellphoneNumber"
                            label="Teléfono"
                            fullWidth
                            value={form.cellphoneNumber}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="password"
                            label="Contraseña"
                            type="password"
                            fullWidth
                            value={form.password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Rol</InputLabel>
                            <Select
                                name="role"
                                value={form.role}
                                label="Rol"
                                onChange={handleChange}
                                startAdornment={<Work />}
                            >
                                <MenuItem value="ADMIN">Administrador</MenuItem>
                                <MenuItem value="EMPLOYEE">Empleado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Departamento</InputLabel>
                            <Select
                                name="departmentId"
                                value={form.departmentId}
                                label="Departamento"
                                onChange={handleChange}
                                startAdornment={<Business />}
                            >
                                {departments.map((dep) => (
                                    <MenuItem key={dep.id} value={dep.id}>
                                        {dep.name}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "flex-end", px: 3, pb: 2 }}>
                <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Registrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
