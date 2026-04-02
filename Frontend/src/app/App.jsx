import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../features/LandingPage";
import UserRoutes from "../routes/UserRoutes";
// import AdminRoutes from "../routes/AdminRoutes";

export default function App() {
    return (
        <Router>
            {/* Perbaikan: Pastikan setiap pindah halaman, scroll balik ke atas */}
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<LandingPage />} />
                
                {/* User Route: Menggunakan wildcards (*) sudah benar. 
                   Nanti di dalam UserRoutes.jsx kita akan bungkus dengan UserLayout.
                */}
                <Route path="/user/*" element={<UserRoutes />} />
                
                {/* Fallback Route: Jika user mengetik asal, lempar balik ke Landing Page */}
                <Route path="*" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}