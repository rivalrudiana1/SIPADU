import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50 font-jakarta">
            {/* Sidebar Tetap di Kiri */}
            <AdminSidebar />

            <div className="flex-grow flex flex-col">
                {/* Header Admin (Isi Profil & Notif) */}
                <AdminHeader />

                {/* Konten Dinamis (Dashboard/Tickets/User) */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}