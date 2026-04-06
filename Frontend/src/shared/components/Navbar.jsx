import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. STATUS LOGIN
    const isLoggedIn = localStorage.getItem("token") !== null;

    // 2. DAFTAR MENU
    let navItems = [
        { name: "Beranda", path: "/" },
        { name: "Layanan", path: "/user/layanan" },
        { name: "Informasi", path: "/user/informasi" },
        { name: "FAQ", path: "/user/faq" }
    ];

    // Jika sudah login, tambahkan menu Dasbor dan Buat Pengajuan
    if (isLoggedIn) {
        navItems = [
            { name: "Beranda", path: "/" },
            { name: "Dasbor", path: "/user/" },
            { name: "Buat Pengajuan", path: "/user/pengajuan" },
            { name: "Layanan", path: "/user/layanan" },
            { name: "Informasi", path: "/user/informasi" },
            { name: "FAQ", path: "/user/faq" }
        ];
    }

    // 3. FUNGSI LOGOUT DENGAN SWEETALERT2
    const handleLogout = () => {
        Swal.fire({
            title: 'Konfirmasi Keluar',
            text: "Apakah Anda yakin ingin mengakhiri sesi?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#B8A165', // Warna Gold Dinas
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Keluar',
            cancelButtonText: 'Batal',
            fontFamily: 'Plus Jakarta Sans'
        }).then((result) => {
            if (result.isConfirmed) {
                // Hapus token
                localStorage.removeItem("token");
                
                // Tampilkan notifikasi sukses sebentar
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Anda telah keluar dari aplikasi.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    // Redirect dan Refresh
                    navigate("/");
                    window.location.reload();
                });
            }
        });
    };

    return (
        <nav className="w-full bg-[#B8A165] h-[46px] flex items-center justify-end px-11 gap-1 shadow-md font-jakarta">
            {navItems.map((item) => {
                // --- LOGIKA FIX ACTIVE MENU (DASBOR TIDAK AKTIF TERUS) ---
                const isActive =
                    item.path === "/"
                        ? location.pathname === "/" // Beranda harus pas "/"
                        : item.path === "/user/"
                            ? location.pathname === "/user/" || location.pathname === "/user" // Dasbor harus pas
                            : location.pathname.startsWith(item.path); // Menu lain pakai startsWith

                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`
                            relative px-4 py-1.5 text-[13px] font-medium tracking-wide text-white transition-all duration-200 rounded
                            hover:bg-white/15
                            ${isActive ? "bg-white/20" : ""}
                            group
                        `}
                    >
                        {item.name}

                        {/* Garis Bawah Animasi (Active Indicator) */}
                        <span className={`
                            absolute bottom-1 left-4 right-4 h-0.5 bg-white rounded-full transition-transform duration-300
                            ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                        `}></span>
                    </Link>
                );
            })}

            {/* Tombol Keluar (Hanya muncul jika sudah login) */}
            {isLoggedIn && (
                <button
                    onClick={handleLogout}
                    className="ml-5 px-4 py-1 border border-white text-white text-[11px] font-bold rounded transition-all duration-300 hover:bg-white hover:text-red-500 uppercase tracking-widest shadow-sm"
                >
                    Keluar
                </button>
            )}
        </nav>
    );
};

export default Navbar;