import React, { useState } from "react";
import {
    Box,
    Paper,
    Pagination,
    Typography,
    useTheme,
    Select,
    MenuItem,
} from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";


interface CommonTableProps {
    data: Record<string, any>[];
}


const CommonTable: React.FC<CommonTableProps> = ({ data }) => {
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const totalPages = Math.ceil(data.length / rowsPerPage);
    const paginatedRows = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);


    const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(event.target.value);
        setPage(1); // reset to page 1
    };


    if (!data || data.length === 0) return <p>No hay datos disponibles.</p>;


    const columns: GridColDef[] = Object.keys(data[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        flex: 1,
        headerAlign: "center",
        align: "center",
    }));


    return (
        <Paper elevation={3} sx={{ height: 600, p: 2 }}>
            <DataGrid
                rows={paginatedRows.map((row, i) => ({
                    id: i + (page - 1) * rowsPerPage,
                    ...row,
                }))}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 20]}
                hideFooterPagination
                hideFooterSelectedRowCount
                slots={{
                    toolbar: () => (
                        <GridToolbarContainer sx={{ gap: 1, px: 1, py: 1 }}>
                            <GridToolbarColumnsButton />
                            <GridToolbarFilterButton />
                            <GridToolbarDensitySelector />
                            <GridToolbarExport />
                        </GridToolbarContainer>
                    ),
                    footer: () => (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                p: 2,
                                borderTop: `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <Typography variant="body2">
                                Mostrando {paginatedRows.length} de {data.length} registros
                            </Typography>


                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography variant="body2">Filas por página:</Typography>
                                <Select
                                    size="small"
                                    value={rowsPerPage}
                                    onChange={handleChangeRowsPerPage}
                                >
                                    {[5, 10, 20].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>


                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handleChangePage}
                                    showFirstButton
                                    showLastButton
                                    color="primary"
                                />
                            </Box>
                        </Box>
                    ),
                }}
                sx={{
                    fontFamily: theme.typography.fontFamily,
                    border: `1px solid ${theme.palette.divider}`,
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                        borderBottom: `2px solid ${theme.palette.divider}`,
                        fontSize: "0.95rem",
                    },
                    "& .MuiDataGrid-cell": {
                        fontSize: "0.875rem",
                        color: theme.palette.text.primary,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                    },
                }}
            />
        </Paper>
    );
};


export default CommonTable;

