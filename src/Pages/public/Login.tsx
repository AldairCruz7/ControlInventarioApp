import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';
import backgroundLogin from '../../images/background_login.jpg';

import useSessionStore from "../../store/useSessionStore.ts";
import {apiRequest} from "../../services/apiRequest.ts";

const Login = () => {

    const handleLogin = async () => {
        try {
            const response = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({ username: "Aldair Cruz" }),
            });

            if (response.token) {
                useSessionStore.getState().login(response.token);
            }
        } catch (error) {
            console.error("Error en el login:", error);
        }
    };



    return (
        <Grid container sx={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            {/* Sección de la Imagen (lado izquierdo) */}
            <Grid
                item xs={12} md={5}
                sx={{
                    backgroundImage: `url(${backgroundLogin})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '80vh',
                    maxHeight: '600px',
                    borderRadius: '10px',
                    display: { xs: 'none', md: 'block' },
                }}
            />

            {/* Sección del Formulario (lado derecho) */}
            <Grid
                item xs={12} md={6}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        backgroundColor: 'white',
                        p: 5,
                        borderRadius: 3,
                        boxShadow: 4,
                        textAlign: 'center',
                        maxWidth: '450px',
                        ml: 5,
                    }}
                >
                    <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                        Bienvenido
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" mb={4}>
                        Inicia sesión para continuar
                    </Typography>

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField fullWidth label="Usuario" variant="outlined" sx={{ mb: 2 }} />
                        <TextField fullWidth label="Contraseña" type="password" variant="outlined" sx={{ mb: 2 }} />
                        <Button fullWidth variant="contained" color="primary" sx={{ py: 1.5, fontSize: '1rem' }} onClick={handleLogin}>
                            ENTRAR
                        </Button>
                    </Box>

                    <Typography variant="body2" color="textSecondary" mt={4}>
                        ¿Olvidaste tu contraseña?
                    </Typography>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Login;
