import * as React from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
    TextField, InputAdornment, Typography, FormControlLabel, Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import { Business } from "@mui/icons-material";
import { getDepartments } from "../services/DepartmentService.ts";
import DescriptionIcon from "@mui/icons-material/Description";
import Switch from "@mui/material/Switch";
import {useValidation} from "../../../../Hooks/useValidation.ts";


type RegisterDepartmentProps = {
    open: boolean;
    handleClose: () => void;
};

export const RegisterDepartment = ({ open, handleClose }: RegisterDepartmentProps) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        active: true,
    });

    const [errors, setErrors] = useState({
        name: "",
        description: ""
    });

    const { getInputError } = useValidation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
        const error = getInputError(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, active: e.target.checked }));
    };

    const getAllDepartments = async () => {
        const response = await getDepartments();
        console.log(response); // opcional
    };

    useEffect(() => {
        getAllDepartments().then();
    }, []);

    const handleSubmit = () => {
        const newErrors = {
            name: getInputError("name", form.name),
            description: getInputError("description", form.description)
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((error) => error !== "");
        if (hasError) return;

        console.log("✅ Formulario válido:", form);
        // Aquí puedes hacer la llamada con axios.post("/api/department", form)
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ backgroundColor: "primary.main", color: "white", fontWeight: "bold" }}>
                <Typography variant="h4" gutterBottom fontWeight="bold" color="white">
                    Registrar Departamento
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                <Typography mb={2}>Completa los datos del formulario.</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="name"
                            label="Nombre de área"
                            fullWidth
                            value={form.name}
                            onChange={handleChange}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Business />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="description"
                            label="Descripción"
                            fullWidth
                            value={form.description}
                            onChange={handleChange}
                            error={Boolean(errors.description)}
                            helperText={errors.description}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.active}
                                    onChange={handleSwitchChange}
                                />
                            }
                            label={form.active ? "Activo" : "Desactivado"}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <Divider />

            <DialogActions sx={{ justifyContent: "flex-end", px: 3, pb: 2 }}>
                <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Registrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
