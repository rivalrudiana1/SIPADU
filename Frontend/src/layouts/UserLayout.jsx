import { Outlet } from "react-router-dom";
import Header from "../shared/components/Header";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

export default function UserLayout() {
    return (
        // min-h-screen dan flex-col memastikan footer selalu di paling bawah
        // Di dalam return file Layout/LandingPage:
        <div className="min-h-screen flex flex-col bg-gray-50">

            {/* SATUKAN HEADER & NAVBAR DI SINI */}
            <div className="fixed top-0 left-0 right-0 z-[100]">
                <Header />
                <Navbar />
            </div>

            {/* ISI HALAMAN */}
            <main className="flex-grow pt-[124px]">
                {/* pt-124px adalah hasil dari 78px (Header) + 46px (Navbar) */}
                <Outlet /> {/* atau <HeroSection /> jika di LandingPage */}
            </main>

            <Footer />
        </div>
    );
}