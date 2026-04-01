import { useState } from "react";
import "../shared/styles/LandingPage.css";

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
const Header = ({ onSearchClick }) => (
    <header className="header">
        <div className="logo-area">
            <div className="logo-emblem">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="11" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" fill="none" />
                    <path d="M7 19 Q14 7 21 19" stroke="white" strokeWidth="1.8" fill="none" />
                    <circle cx="14" cy="11" r="3" fill="rgba(255,255,255,.85)" />
                </svg>
            </div>

            <div className="logo-text-group">
                <span className="logo-title">DICIPTABINTAR</span>
                <span className="logo-sub-text">
                    Dinas Cipta Karya, Bina Konstruksi<br />dan Tata Ruang Kota Bandung
                </span>
            </div>

            <div className="logo-badge">db</div>
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
                    href="#"
                    className={`nav-link${active === link ? " active" : ""}`}
                    onClick={(e) => { e.preventDefault(); setActive(link); }}
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

    return (
        <div>
            <Header onSearchClick={() => alert("Fitur pencarian akan segera hadir!")} />
            <Navbar active={activeNav} setActive={setActiveNav} />
            <div className="header-spacer" />
            <HeroSection />
            <StatsRibbon />
        </div>
    );
}