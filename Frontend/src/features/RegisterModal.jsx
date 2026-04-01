import React, { useState } from 'react';
import "../shared/styles/LandingPage.css";

const RegisterModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        nama: '',
        umur: '',
        alamat: '',
        nik: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data Registrasi:", formData);
        // Integrasi API lo di sini
        alert("Pendaftaran Berhasil!");
        onClose();
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
                    <div className="input-group">
                        <label>Nama Lengkap</label>
                        <input 
                            type="text" name="nama" placeholder="Contoh: Ilham Pratama" 
                            onChange={handleChange} required 
                        />
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

                    <button type="submit" className="btn btn-primary w-full">
                        Kirim Pendaftaran
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;