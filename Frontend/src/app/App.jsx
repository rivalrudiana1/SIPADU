import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../features/LandingPage";
import UserRoutes from "../routes/UserRoutes";
import AdminRoutes from "../routes/AdminRoutes"; // 1. Pastikan diimport

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<LandingPage />} />
                
                {/* User Route */}
                <Route path="/user/*" element={<UserRoutes />} />

                {/* Admin Route - Pastikan Path ini Aktif */}
                <Route path="/admin/*" element={<AdminRoutes />} />
                
                {/* Fallback Route */}
                <Route path="*" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}