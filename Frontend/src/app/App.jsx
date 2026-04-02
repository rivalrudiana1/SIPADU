import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../features/LandingPage"; // Sesuaikan jika path-nya 'src/app/...' atau '../features/...'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                
                {/* Nanti rute dashboard user kamu tambahkan di sini */}
                {/* <Route path="/user/dashboard" element={<DashboardUser />} /> */}
            </Routes>
        </Router>
    );
}