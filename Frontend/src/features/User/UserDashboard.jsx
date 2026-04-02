import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../shared/components/Header";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";    

export default function UserDashboard() {
    const navigate = useNavigate();

    // Data dummy sementara (nanti diganti dengan data dari API/Database)
    const riwayat = [
        { id: "TK-001", tanggal: "01/04/2026", judul: "Perbaikan Jalan Rusak", status: "Diproses" },
        { id: "TK-002", tanggal: "28/03/2026", judul: "Izin Tata Ruang Bangunan", status: "Selesai" }
    ];

    return (
        <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: 'var(--dark)' }}>Riwayat Pengajuan</h2>
                <button 
                    onClick={() => navigate('/user/pengajuan')} 
                    style={{ background: 'var(--gold)', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + Buat Pengajuan
                </button>
            </div>

            <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--off-white)' }}>
                        <tr>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>ID Tiket</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Tanggal</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Judul Pengajuan</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Status</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riwayat.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '15px' }}>{item.id}</td>
                                <td style={{ padding: '15px' }}>{item.tanggal}</td>
                                <td style={{ padding: '15px' }}>{item.judul}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ 
                                        padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', 
                                        background: item.status === 'Selesai' ? '#d4edda' : '#fff3cd', 
                                        color: item.status === 'Selesai' ? '#155724' : '#856404' 
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <button 
                                        onClick={() => navigate(`/user/tracking/${item.id}`)} 
                                        style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Lacak
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}