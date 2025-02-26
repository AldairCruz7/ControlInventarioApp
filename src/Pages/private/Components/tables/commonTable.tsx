import React from "react";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

interface CommonTableProps {
    data: Record<string, any>[]; // ✅ Permite cualquier tipo de datos dinámicamente
}

const CommonTable: React.FC<CommonTableProps> = ({ data }) => {
    if (!data || data.length === 0) return <p>No hay datos disponibles.</p>;


    const columns: GridColDef[] = Object.keys(data[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1), // ✅ Capitaliza el header
        flex: 1,
        headerAlign: "center",
        align: "center",
        type: typeof data[0][key] === "number" ? "number" : typeof data[0][key] === "boolean" ? "boolean" : "string",
    }));

    return (
        <Paper style={{ height: "500px", padding: "10px" }}>
            <DataGrid
                rows={data.map((row, index) => ({ id: index, ...row }))} // ✅ Agrega un `id` a cada fila
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#ffffff",
                        color: "#1976d2",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderBottom: "2px solid #cccccc",
                    },
                    "& .MuiDataGrid-cell": {
                        fontSize: "14px",
                        color: "#000000",
                    },
                    "& .MuiDataGrid-root": {
                        backgroundColor: "#ffffff",
                        border: "1px solid #cccccc",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        display: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer": {
                        color: "#1976d2",
                    },
                }}
            />
        </Paper>
    );
};

export default CommonTable;
