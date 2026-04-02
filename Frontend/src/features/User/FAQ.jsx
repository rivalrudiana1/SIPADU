import React from 'react';
import { Card, CardBody, Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

// --- [TANDA 1 - IMPORT] ---
// Menggunakan path yang kamu berikan
import Header from "../../shared/components/Header";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

export default function FAQ() {
    // State untuk kontrol akordion (opsional jika ingin interaktif)
    const [open, setOpen] = React.useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const faqs = [
        { 
            id: 1,
            q: "Bagaimana cara melacak status pengajuan saya?", 
            a: "Anda dapat melacak status pengajuan melalui menu 'Riwayat' di dashboard akun Anda, lalu klik tombol 'Lacak' pada tiket yang bersangkutan." 
        },
        { 
            id: 2,
            q: "Berapa lama proses verifikasi pengajuan?", 
            a: "Proses verifikasi dokumen administrasi biasanya memakan waktu 1 hingga 3 hari kerja setelah pengajuan dikirimkan." 
        },
        {
            id: 3,
            q: "Apakah layanan DICIPTABINTAR dipungut biaya?",
            a: "Seluruh layanan informasi dan administrasi pengajuan melalui aplikasi ini tidak dipungut biaya (GRATIS)."
        }
    ];

    return (
        // --- [TANDA 2 - WRAPPER] ---
        <div className="min-h-screen flex flex-col bg-gray-50">

            {/* Konten Utama */}
            <main className="flex-grow w-full max-w-4xl mx-auto p-8">
                
                <div className="text-center mb-12 mt-8">
                    <Typography variant="h2" color="blue-gray" className="font-bold">
                        Pusat Bantuan & FAQ
                    </Typography>
                    <Typography variant="paragraph" color="gray" className="mt-2 font-normal">
                        Temukan jawaban untuk pertanyaan yang paling sering ditanyakan oleh warga Kota Bandung.
                    </Typography>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq) => (
                        <Card key={faq.id} className="shadow-sm border border-gray-100">
                            <CardBody className="p-0">
                                <Accordion open={open === faq.id} className="px-6 border-none">
                                    <AccordionHeader 
                                        onClick={() => handleOpen(faq.id)}
                                        className={`text-base border-none hover:text-[#B8A165] transition-colors ${open === faq.id ? "text-[#B8A165]" : "text-blue-gray-700"}`}
                                    >
                                        {faq.q}
                                    </AccordionHeader>
                                    <AccordionBody className="text-sm pt-0 pb-6 text-gray-600 leading-relaxed">
                                        {faq.a}
                                    </AccordionBody>
                                </Accordion>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-white rounded-lg border border-dashed border-gray-300 text-center">
                    <Typography variant="small" color="gray" className="font-normal">
                        Masih punya pertanyaan lain? Silahkan hubungi kantor dinas terdekat atau gunakan fitur chat bantuan (Segera hadir).
                    </Typography>
                </div>
            </main>

        </div>
    );
}