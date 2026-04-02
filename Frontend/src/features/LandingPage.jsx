import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

// Import komponen-komponen global
import Header from "../shared/components/Header";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import RegisterModal from "./RegisterModal"; 
import LoginModal from "./LoginModal";

// ── ICONS ──────────────────────────────────────────────────────────────────────
const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 13 13" fill="none" className="mr-2">
        <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ArrowIcon = () => (
    <svg width="14" height="14" viewBox="0 0 13 13" fill="none" className="mr-2">
        <path d="M1.5 6.5h10M6.5 1.5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ── HERO SECTION ──────────────────────────────────────────────────────────────
const HeroSection = ({ onRegisterClick, onLoginClick }) => (
    <section className="relative w-full h-[calc(100vh-124px)] min-h-[560px] flex items-center overflow-hidden font-jakarta bg-[#1A1A1A]">
        {/* Hero Background */}
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(28, 35, 45, 0.58) 0%, rgba(28, 35, 45, 0.52) 55%, rgba(18, 24, 33, 0.74) 100%), url('/src/assets/Background.png')` 
            }}
        />
        
        {/* Stripe Overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.04]" 
             style={{ backgroundImage: 'repeating-linear-gradient(-55deg, transparent, transparent 58px, #B8A165 58px, #B8A165 59px)' }} 
        />

        <div className="relative z-10 px-8 md:px-20 max-w-[820px]">
            <div className="inline-block bg-gold/20 border border-gold/50 text-gold-light text-[11px] font-bold tracking-[0.18em] uppercase px-[14px] py-[5px] rounded-[3px] mb-[22px] animate-fade-up [animation-delay:0.1s] opacity-0">
                Kota Bandung · Jawa Barat
            </div>

            <h1 className="font-playfair text-[clamp(38px,5.4vw,70px)] font-black text-white leading-[1.08] mb-5 drop-shadow-lg animate-fade-up [animation-delay:0.28s] opacity-0">
                Dinas Cipta Karya<br />
                Bina Konstruksi dan<br />
                <span className="text-gold-light">Tata Ruang</span><br />
                Kota Bandung
            </h1>

            <p className="text-white/80 text-[clamp(14px,1.45vw,17px)] font-light leading-[1.75] max-w-[460px] mb-10 animate-fade-up [animation-delay:0.46s] opacity-0">
                Melayani dan Memberikan Informasi Kepada Warga Kota Bandung.
            </p>

            <div className="flex flex-wrap gap-[14px] animate-fade-up [animation-delay:0.62s] opacity-0">
                <Button 
                    onClick={onRegisterClick}
                    className="bg-gold hover:bg-gold-light flex items-center px-8 py-[14px] rounded-[4px] shadow-lg shadow-gold/40 text-[13px] tracking-[0.1em] font-bold uppercase transition-all hover:-translate-y-0.5"
                >
                    <PlusIcon /> Registrasi
                </Button>
                <Button 
                    variant="outlined"
                    onClick={onLoginClick}
                    className="border-2 border-white/65 text-white hover:bg-white/10 flex items-center px-8 py-[14px] rounded-[4px] text-[13px] tracking-[0.1em] font-bold uppercase transition-all hover:-translate-y-0.5"
                >
                    <ArrowIcon /> Masuk
                </Button>
            </div>
        </div>
    </section>
);

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
    // State untuk kontrol modal
    const [isRegisterOpen, setIsRegisterOpen] = useState(false); 
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div className="bg-offWhite min-h-screen flex flex-col relative font-jakarta">
            
            {/* WRAPPER FIXED: Satukan Header & Navbar agar tidak renggang */}
            <div className="fixed top-0 left-0 right-0 z-[50]">
                {/* Pastikan di dalam Header.jsx & Navbar.jsx TIDAK ADA class 'fixed' lagi */}
                <Header onSearchClick={() => alert("Pencarian aktif")} />
                <Navbar />
            </div>
            
            <main className="flex-grow">
                {/* pt-[124px] adalah tinggi Header(78) + Navbar(46) */}
                <div className="pt-[124px]">
                    <HeroSection 
                        onRegisterClick={() => setIsRegisterOpen(true)}
                        onLoginClick={() => setIsLoginOpen(true)}
                    />
                </div>
            </main>

            {/* MODAL SYSTEMS: Pastikan komponen Modal menerima props isOpen & onClose */}
            <RegisterModal 
                isOpen={isRegisterOpen} 
                onClose={() => setIsRegisterOpen(false)} 
            />
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
            />
            
            <Footer />
        </div>
    );
}