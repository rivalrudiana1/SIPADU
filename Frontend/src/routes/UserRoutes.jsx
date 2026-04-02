import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout"; // Import Layout Utama
import UserDashboard from "../features/User/UserDashboard";
import FormPengajuan from "../features/User/FormPengajuan";
import Layanan from "../features/User/Layanan";
import Informasi from "../features/User/Informasi";
import FAQ from "../features/User/FAQ";
import TrackingDetail from "../features/User/TrackingDetail";

export default function UserRoutes() {
    return (
        <Routes>
            {/* Bungkus semua rute dengan UserLayout sebagai parent */}
            <Route element={<UserLayout />}>
                <Route path="/" element={<UserDashboard />} />
                <Route path="/pengajuan" element={<FormPengajuan />} />
                <Route path="/layanan" element={<Layanan />} />
                <Route path="/informasi" element={<Informasi />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/tracking/:id" element={<TrackingDetail />} />
            </Route>
        </Routes>
    );
}