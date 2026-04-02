import React, { useState } from 'react';
import "../shared/styles/LandingPage.css";
// Pastikan path import ini sesuai dengan struktur folder kamu
import { register } from "../shared/services/auth"; 

const RegisterModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        nama: '',
        email: '',     // Ditambahkan untuk kebutuhan login
        password: '',  // Ditambahkan untuk kebutuhan login
        nik: '',
        umur: '',
        alamat: ''
    });

    // State untuk menangani loading dan error
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg(""); // Hapus pesan error jika user mulai mengetik lagi
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        try {
            // Kita sesuaikan nama field (payload) agar cocok dengan Prisma Schema di Backend
            const payload = {
                name: formData.nama,
                email: formData.email,
                password: formData.password,
                nik: formData.nik,
                // Catatan: Jika 'umur' dan 'alamat' belum ada di schema.prisma, 
                // data ini tidak akan tersimpan di database kecuali kamu menambahkannya.
            };

            // Memanggil API Backend
            await register(payload);
            
            alert("Pendaftaran Berhasil! Silakan masuk menggunakan akun Anda.");
            onClose(); // Menutup modal otomatis
            
        } catch (error) {
            // Menangkap dan menampilkan error dari backend (misal: email sudah terpakai)
            setErrorMsg(
                error.response?.data?.message || "Terjadi kesalahan saat melakukan registrasi."
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
                    <h2 className="modal-title">Formulir <span>Registrasi</span></h2>
                    <p className="modal-subtitle">Lengkapi data diri Anda sesuai dengan KTP untuk melanjutkan layanan.</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    {/* Pesan Error */}
                    {errorMsg && (
                        <div style={{ color: 'red', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>
                            {errorMsg}
                        </div>
                    )}

                    <div className="input-group">
                        <label>Nama Lengkap</label>
                        <input 
                            type="text" name="nama" placeholder="Contoh: Ilham Pratama" 
                            onChange={handleChange} required 
                        />
                    </div>

                    {/* Tambahan Input Email & Password untuk Auth */}
                    <div className="input-row">
                        <div className="input-group">
                            <label>Email</label>
                            <input 
                                type="email" name="email" placeholder="email@anda.com" 
                                onChange={handleChange} required 
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input 
                                type="password" name="password" placeholder="Minimal 6 karakter" 
                                onChange={handleChange} required minLength="6"
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>NIK</label>
                            <input 
                                type="text" name="nik" placeholder="16 digit angka" 
                                maxLength="16" onChange={handleChange} required 
                            />
                        </div>
                        <div className="input-group" style={{ flex: '0 0 80px' }}>
                            <label>Umur</label>
                            <input 
                                type="number" name="umur" placeholder="th" 
                                onChange={handleChange} required 
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Alamat Lengkap</label>
                        <textarea 
                            name="alamat" rows="3" placeholder="Masukkan alamat sesuai domisili..." 
                            onChange={handleChange} required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                        {isLoading ? "Memproses Data..." : "Kirim Pendaftaran"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;