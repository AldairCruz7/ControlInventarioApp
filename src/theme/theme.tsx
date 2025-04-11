import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2", // azul clásico
        },
        secondary: {
            main: "#dc004e", // rojo elegante
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
        text: {
            primary: "#212121",
            secondary: "#757575",
        },
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
        h1: { fontSize: "2.25rem", fontWeight: 700 },
        h2: { fontSize: "1.75rem", fontWeight: 600 },
        h3: { fontSize: "1.5rem", fontWeight: 600 },
        h4: { fontSize: "1.25rem", fontWeight: 500 },
        h5: { fontSize: "1rem", fontWeight: 500 }, // para botones
        h6: { fontSize: "0.875rem", fontWeight: 500 },
        body1: { fontSize: "1rem" },
        body2: { fontSize: "0.875rem" },
        button: {
            fontWeight: 600,
            letterSpacing: "0.5px",
            textTransform: "none",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    padding: "6px 16px",
                },
            },
            defaultProps: {
                variant: "contained",
                color: "primary",
                disableElevation: true,
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: "1rem",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                    padding: "1.5rem",
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                size: "small",
            },
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    borderCollapse: "separate",
                    borderSpacing: "0 8px",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid #e0e0e0",
                },
                head: {
                    fontWeight: 600,
                    color: "#1976d2",
                },
            },
        },
    },
});

export default theme;
