import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../shared/styles/LandingPage.css"; 
// Pastikan import layanan auth kamu sesuai path-nya
import { login } from "../shared/services/auth";

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        identifier: '', // Email atau NIK
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    if (!isOpen) return null;

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setErrorMsg(""); // Reset error saat mengetik
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        try {
            // Karena backend kamu sebelumnya memakai field "email", 
            // kita petakan 'identifier' dari form menjadi 'email' untuk dikirim ke backend
            const payload = {
                email: loginData.identifier, 
                password: loginData.password
            };

            await login(payload);
            
            onClose(); // Tutup modal jika sukses
            navigate("/user/dashboard"); // Arahkan ke dashboard
            
        } catch (error) {
            setErrorMsg(
                error.response?.data?.message || "Login gagal. Periksa kembali data Anda."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay anim-fade-in" onClick={onClose}>
            <div className="modal-content anim-fade-up-1" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>&times;</button>
                
                <div className="modal-header">
                    <h2 className="modal-title">Selamat <span>Datang</span></h2>
                    <p className="modal-subtitle">Silakan masuk menggunakan akun DICIPTABINTAR Anda.</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    {/* Pesan Error */}
                    {errorMsg && (
                        <div style={{ color: '#dc2626', fontSize: '14px', marginBottom: '15px', textAlign: 'center', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px' }}>
                            {errorMsg}
                        </div>
                    )}

                    <div className="input-group">
                        <label>Email / NIK</label>
                        <input 
                            type="text" name="identifier" placeholder="Masukkan Email atau NIK" 
                            onChange={handleChange} required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" name="password" placeholder="••••••••" 
                            onChange={handleChange} required 
                        />
                    </div>

                    <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '-10px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#777' }}>
                            <input type="checkbox" /> Ingat Saya
                        </label>
                        <a href="#" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: '600' }}>Lupa Password?</a>
                    </div>

                    {/* PERUBAHAN WARNA TOMBOL ADA DI SINI */}
                    {/* Mengganti var(--dark) menjadi var(--gold) */}
                    <button 
                        type="submit" 
                        className="btn btn-primary w-full" 
                        style={{ background: 'var(--gold)', color: '#fff', border: 'none', opacity: isLoading ? 0.7 : 1 }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Memproses..." : "Masuk Aplikasi"}
                    </button>
                </form>

                <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '20px', color: '#777' }}>
                    Belum punya akun? <span onClick={onClose} style={{ color: 'var(--gold)', cursor: 'pointer', fontWeight: '700' }}>Daftar Sekarang</span>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;