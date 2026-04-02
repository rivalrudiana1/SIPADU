import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "../../shared/components/Header";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

export default function TrackingDetail() {
    // Menangkap :id dari URL rute (misal: /user/tracking/TK-001)
    const { id } = useParams();

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--dark)' }}>Detail Pelacakan Tiket</h2>
            
            <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', marginTop: '20px', borderTop: '4px solid var(--gold)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: '14px', color: '#777', textTransform: 'uppercase', letterSpacing: '2px' }}>Nomor Tiket</p>
                <h1 style={{ color: 'var(--gold-dark)', margin: '10px 0 30px 0' }}>{id}</h1>
                
                <div style={{ padding: '20px', background: 'var(--off-white)', borderRadius: '8px', marginBottom: '30px' }}>
                    <p style={{ fontSize: '16px', color: '#555' }}>Status Pengajuan Saat Ini:</p>
                    <h3 style={{ color: '#e67e22', marginTop: '5px' }}>SEDANG DIPROSES</h3>
                    <p style={{ fontSize: '13px', color: '#777', marginTop: '10px' }}>Tim Dinas Cipta Karya sedang melakukan verifikasi terhadap dokumen dan laporan Anda.</p>
                </div>

                <Link to="/user" style={{ textDecoration: 'none', color: 'var(--gold)', fontWeight: 'bold', fontSize: '14px' }}>
                    &larr; Kembali ke Riwayat
                </Link>
            </div>
        </div>
    );
}