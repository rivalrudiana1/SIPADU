import { useState, useEffect } from "react";
import "../shared/styles/LandingPage.css";
// Pastikan path image ini sesuai dengan tempat kamu menyimpan gambarnya
import logoDiciptabintar from "../assets/logo.png";

// ── ICONS (inline SVG) ────────────────────────────────────────────────────────
const SearchIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="6" cy="6" r="4.5" stroke="#888" strokeWidth="1.5" />
        <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const PlusIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 1v11M1 6.5h11" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ArrowIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M1.5 6.5h10M6.5 1.5l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ── HEADER ────────────────────────────────────────────────────────────────────
// Sekarang menggunakan satu gambar logo utama
const Header = ({ onSearchClick }) => (
    <header className="header">
        <div className="logo-area-new">
            <a href="/" className="logo-link">
                <img 
                    src={logoDiciptabintar} 
                    alt="Logo DICIPTABINTAR Kota Bandung" 
                    className="main-logo-img" 
                />
            </a>
        </div>

        <button className="search-btn" onClick={onSearchClick}>
            <SearchIcon />Cari Informasi...
        </button>
    </header>
);

// ── NAVBAR ────────────────────────────────────────────────────────────────────
const Navbar = ({ active, setActive }) => {
    const links = ["Beranda", "Layanan", "Informasi"];
    return (
        <nav className="navbar">
            {links.map((link) => (
                <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className={`nav-link${active === link ? " active" : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setActive(link);
                    }}
                >
                    {link}
                </a>
            ))}
        </nav>
    );
};

// ── HERO ──────────────────────────────────────────────────────────────────────
const HeroSection = () => (
    <section className="hero">
        <div className="hero-bg" />
        <div className="hero-stripe-overlay" />

        <div className="hero-content">
            <div className="hero-tag anim-fade-up-1">
                Kota Bandung · Jawa Barat
            </div>

            <h1 className="hero-title anim-fade-up-2">
                Dinas Cipta Karya<br />
                Bina Konstruksi dan<br />
                <span>Tata Ruang</span><br />
                Kota Bandung
            </h1>

            <p className="hero-subtitle anim-fade-up-3">
                Melayani dan Memberikan Informasi<br />Kepada Warga Kota Bandung.
            </p>

            <div className="hero-actions anim-fade-up-4">
                <a href="#" className="btn btn-primary"><PlusIcon /> Registrasi</a>
                <a href="#" className="btn btn-outline"><ArrowIcon /> Masuk</a>
            </div>
        </div>

        <div className="scroll-hint anim-fade-in">
            <span>Gulir</span>
            <div className="bounce-arrow" />
        </div>
    </section>
);

// ── STATS RIBBON ──────────────────────────────────────────────────────────────
const STATS = [
    { icon: "🏗️", label: "Proyek Aktif", value: "128+" },
    { icon: "📋", label: "Layanan Tersedia", value: "24" },
    { icon: "👤", label: "Pengguna Terdaftar", value: "12.5K" },
    { icon: "📍", label: "Kecamatan", value: "30" },
];

const StatsRibbon = () => (
    <div className="stats-ribbon">
        {STATS.map((s) => (
            <div key={s.label} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div>
                    <div className="stat-label">{s.label}</div>
                    <div className="stat-value">{s.value}</div>
                </div>
            </div>
        ))}
    </div>
);

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
    const [activeNav, setActiveNav] = useState("Beranda");
    const [isScrolled, setIsScrolled] = useState(false);

    // Menangani efek scroll untuk header/navbar jika diperlukan di CSS
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`page-wrapper ${isScrolled ? "is-scrolled" : ""}`}>
            <Header onSearchClick={() => alert("Fitur pencarian akan segera hadir!")} />
            <Navbar active={activeNav} setActive={setActiveNav} />
            
            <main>
                <div className="header-spacer" />
                <HeroSection />
                <StatsRibbon />
                
                {/* Kamu bisa menambahkan section lainnya di sini nanti */}
                <section style={{ height: '50vh' }}>
                    {/* Placeholder untuk konten tambahan */}
                </section>
            </main>

            <footer style={{ padding: '40px', textAlign: 'center', background: '#fff', color: '#888', fontSize: '12px' }}>
                &copy; 2026 DICIPTABINTAR Kota Bandung. All rights reserved.
            </footer>
        </div>
    );
}