import React from 'react';
import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";

// --- [TANDA 1 - IMPORT] ---
// Pastikan path import sesuai dengan struktur folder kamu
import Header from "../../shared/components/Header";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

export default function Informasi() {
    const daftarInformasi = [
        {
            kategori: "Pengumuman",
            color: "red", 
            borderColor: "border-red-500", 
            tanggal: "12 April 2026",
            judul: "Pemeliharaan Sistem Server DICIPTABINTAR",
            isi: "Diberitahukan kepada seluruh warga, akan ada pemeliharaan sistem pada tanggal 15 April 2026 pukul 00:00 - 04:00 WIB. Layanan pengajuan tiket akan ditangguhkan sementara pada jam tersebut."
        },
        {
            kategori: "Prosedur",
            color: "amber",
            borderColor: "border-[#B8A165]", 
            tanggal: "05 Maret 2026",
            judul: "Pembaruan Syarat Dokumen Pengurusan SLF",
            isi: "Berdasarkan Peraturan Daerah terbaru, pengurusan Sertifikat Laik Fungsi (SLF) kini diwajibkan untuk melampirkan dokumen uji kelayakan struktur dari konsultan bersertifikat."
        },
        {
            kategori: "Berita",
            color: "blue",
            borderColor: "border-blue-500",
            tanggal: "20 Februari 2026",
            judul: "Peresmian Taman Kota Bina Ruang Baru",
            isi: "Dinas Cipta Karya Bina Konstruksi dan Tata Ruang telah meresmikan ruang terbuka hijau baru yang berlokasi di kecamatan Bojonagara untuk fasilitas warga."
        }
    ];

    return (
        // --- [TANDA 2 - WRAPPER] ---
        <div className="min-h-screen flex flex-col bg-gray-50">

            {/* Konten Utama */}
            <main className="flex-grow w-full max-w-4xl mx-auto p-8">
                
                <div className="text-center mb-12 mt-8">
                    <Typography variant="h2" color="blue-gray" className="font-bold">
                        Pusat Informasi & Berita
                    </Typography>
                    <Typography variant="paragraph" color="gray" className="mt-2 font-normal">
                        Dapatkan pembaruan, pengumuman, dan prosedur terbaru dari dinas secara real-time.
                    </Typography>
                </div>

                <div className="flex flex-col gap-6">
                    {daftarInformasi.map((info, index) => (
                        <Card key={index} className={`border-l-4 ${info.borderColor} shadow-sm hover:shadow-md transition-shadow`}>
                            <CardBody>
                                <div className="flex items-center gap-4 mb-3">
                                    <Chip 
                                        size="sm" 
                                        variant="ghost" 
                                        color={info.color} 
                                        value={info.kategori} 
                                        className="rounded-full"
                                    />
                                    <Typography variant="small" color="gray" className="font-medium">
                                        {info.tanggal}
                                    </Typography>
                                </div>
                                
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    {info.judul}
                                </Typography>
                                
                                <Typography color="gray" className="font-normal mb-4">
                                    {info.isi}
                                </Typography>
                                
                                <a 
                                    href="#" 
                                    className="inline-block text-[#B8A165] font-bold text-sm hover:underline"
                                >
                                    Baca Selengkapnya &rarr;
                                </a>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </main>

        </div>
    );
}