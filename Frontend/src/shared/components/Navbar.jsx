import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. LOGIC TETAP SAMA
    const isLoggedIn = localStorage.getItem("token") !== null;

    let navItems = [
        { name: "Beranda", path: "/" },
        { name: "Layanan", path: "/user/layanan" },
        { name: "Informasi", path: "/user/informasi" },
        { name: "FAQ", path: "/user/faq" }
    ];

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

    const handleLogout = () => {
        const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            navigate("/");
            window.location.reload();
        }
    };

    return (
        /* PERBAIKAN LAYOUT: 
           - Hapus 'fixed', 'top', dll. Biarkan Navbar mengalir alami di bawah Header.
           - 'bg-gold' (pastikan sudah ada di tailwind.config.js) atau gunakan hex #B8A165
        */
        <nav className="w-full bg-[#B8A165] h-[46px] flex items-center justify-end px-11 gap-1 shadow-md font-jakarta">
            {navItems.map((item) => {
                const isActive = item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);

                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`
                            relative px-4 py-1.5 text-sm font-medium tracking-wide text-white transition-all duration-200 rounded
                            hover:bg-white/15
                            ${isActive ? "bg-white/20" : ""}
                            group
                        `}
                    >
                        {item.name}
                        <span className={`
                            absolute bottom-1 left-4 right-4 h-0.5 bg-white rounded-full transition-transform duration-300
                            ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                        `}></span>
                    </Link>
                );
            })}

            {isLoggedIn && (
                <button
                    onClick={handleLogout}
                    className="ml-5 px-4 py-1.5 border border-white text-white text-[13px] font-semibold rounded transition-all duration-300 hover:bg-white hover:text-red-500 uppercase tracking-wider"
                >
                    Keluar
                </button>
            )}
        </nav>
    );
};

export default Navbar;