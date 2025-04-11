import {Box, Button, Typography} from '@mui/material';
import {useEffect} from "react";

const Home = () => {

    useEffect(() => {

    }, []);
    return (

            <Box>
                <Typography variant="h2">Bienvenido @USER</Typography>
                <Typography variant="body1">
                    Aquí puedes consultar el inventario y tus proveedores.
                </Typography>
                <Button variant="contained" color="primary">
                    Ver inventario
                </Button>
            </Box>

    );
};

export default Home;
