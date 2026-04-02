import { Link } from "react-router-dom";
// Sesuaikan path logo dengan posisi file saat ini
import logoDiciptabintar from "../../assets/logo.png";

// Komponen Icon Pencarian
const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="text-gray-400">
        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const Header = ({ onSearchClick }) => (
    <header className="w-full bg-white border-b border-gray-100 px-8 h-[78px] flex items-center justify-between">
        <img src="/src/assets/logo.png" alt="Logo" className="h-10 w-auto" />
        <button className="bg-gray-50 px-4 py-2 rounded-full border text-sm text-gray-400" onClick={onSearchClick}>
            Cari Informasi...
        </button>
    </header>
);  

export default Header;