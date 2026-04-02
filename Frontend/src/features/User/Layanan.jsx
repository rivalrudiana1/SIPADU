import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

// --- [TANDA 1 - IMPORT] ---
// Taruh import ini di bagian atas file. 
// Karena file ini ada di folder src/features/User/, kita mundur 2 langkah (../../) ke folder components
import Header from "../../shared/components/Header";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
// --------------------------

export default function Layanan() {
    const navigate = useNavigate();

    const daftarLayanan = [
        {
            ikon: "🏗️",
            judul: "Izin Mendirikan Bangunan (IMB)",
            deskripsi: "Layanan perizinan untuk mendirikan, mengubah, atau merenovasi bangunan gedung sesuai dengan tata ruang kota."
        },
        {
            ikon: "🗺️",
            judul: "Rekomendasi Tata Ruang",
            deskripsi: "Pengajuan rekomendasi kesesuaian tata ruang untuk keperluan aktivitas usaha atau pembangunan lahan."
        },
        {
            ikon: "🏢",
            judul: "Sertifikat Laik Fungsi (SLF)",
            deskripsi: "Sertifikat yang diberikan terhadap bangunan gedung yang telah selesai dibangun dan telah memenuhi persyaratan teknis."
        },
        {
            ikon: "🚧",
            judul: "Pelaporan Infrastruktur",
            deskripsi: "Layanan pengaduan masyarakat terkait kerusakan fasilitas umum, aspal jalan, atau saluran drainase kota."
        }
    ];

    return (
        // --- [TANDA 2 - WRAPPER] ---
        // Bungkus seluruh isi return dengan div (misal class "page-wrapper" jika pakai CSS sebelumnya)
        // atau div kosong dengan flexbox agar footer selalu di bawah
        <div className="min-h-screen flex flex-col bg-gray-50"> 

            {/* Konten Utama Halaman (Bungkus dengan tag <main> dan flex-grow agar mendorong footer ke bawah) */}
            <main className="max-w-6xl mx-auto p-8 flex-grow w-full">
                <div className="text-center mb-12 mt-8">
                    <Typography variant="h2" color="blue-gray" className="font-bold">
                        Katalog Layanan Publik
                    </Typography>
                    <Typography variant="paragraph" color="gray" className="mt-2 font-normal">
                        Pilih jenis layanan di bawah ini untuk melihat detail atau mulai membuat pengajuan.
                    </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {daftarLayanan.map((layanan, index) => (
                        <Card key={index} className="border-t-4 border-[#B8A165] shadow-md hover:shadow-lg transition-shadow flex flex-col">
                            <CardBody className="flex flex-col flex-grow text-center lg:text-left">
                                <div className="text-4xl mb-4">{layanan.ikon}</div>
                                
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {layanan.judul}
                                </Typography>
                                
                                <Typography className="font-normal text-gray-600 mb-6 flex-grow">
                                    {layanan.deskripsi}
                                </Typography>
                                
                                <Button 
                                    variant="outlined" 
                                    className="border-[#B8A165] text-[#B8A165] hover:bg-[#B8A165] hover:text-white mt-auto"
                                    fullWidth
                                    onClick={() => navigate('/user/pengajuan')}
                                >
                                    Buat Pengajuan
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </main>

        </div>
    );
}