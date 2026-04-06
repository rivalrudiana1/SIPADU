import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../shared/components/Header";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

export default function FormPengajuan() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ judul: '', kategori: '', deskripsi: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data Pengajuan:", formData);
        // TODO: Integrasi ke API Backend di sini
        alert("Pengajuan berhasil dikirim!");
        navigate('/user'); // Arahkan kembali ke Dashboard Riwayat
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px', color: 'var(--dark)' }}>Formulir Pengajuan Baru</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff', padding: '30px', borderRadius: '8px', borderTop: '4px solid var(--gold)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#555' }}>Judul Pengajuan</label>
                    <input 
                        type="text" required placeholder="Contoh: Perbaikan aspal jalan"
                        onChange={(e) => setFormData({...formData, judul: e.target.value})} 
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
                    />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#555' }}>Kategori Layanan</label>
                    <select 
                        required 
                        onChange={(e) => setFormData({...formData, kategori: e.target.value})} 
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
                    >
                        <option value="">Pilih Kategori...</option>
                        <option value="Infrastruktur">Bina Konstruksi / Infrastruktur</option>
                        <option value="Tata Ruang">Tata Ruang Bangunan</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#555' }}>Deskripsi Detail</label>
                    <textarea 
                        rows="5" required placeholder="Jelaskan detail permohonan atau laporan Anda di sini..."
                        onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} 
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit', resize: 'vertical' }}
                    ></textarea>
                </div>
                
                <button type="submit" style={{ background: 'var(--gold)', color: '#fff', padding: '14px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                    Kirim Pengajuan Sekarang
                </button>
            </form>
        </div>
    );
}