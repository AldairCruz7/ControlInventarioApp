// Layout.tsx
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            <Sidebar collapsed={collapsed} toggleCollapse={() => setCollapsed(!collapsed)} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: collapsed ? "80px" : "270px",
                    transition: "margin 0.3s ease",
                    minHeight: "100vh",
                }}
            >
                <Header onToggleSidebar={() => setCollapsed(!collapsed)} />
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}
