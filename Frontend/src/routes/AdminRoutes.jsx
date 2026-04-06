import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Halaman Admin kamu di sini
// import AdminDashboard from "../features/admin/Dashboard";

const AdminRoutes = () => {
    const token = localStorage.getItem("token");
    
    // Logic sederhana: Jika tidak ada token, tendang ke landing page
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            {/* Index Admin: /admin */}
            <Route path="/" element={<div>Halaman Dashboard Admin (Sedang Dibuat)</div>} />
            
            {/* Sub-menu: /admin/tickets, dll */}
            <Route path="tickets" element={<div>Manajemen Tiket</div>} />
        </Routes>
    );
};

export default AdminRoutes;