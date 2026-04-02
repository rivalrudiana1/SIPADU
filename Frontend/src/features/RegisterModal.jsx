import React, { useState } from 'react';
import {
    Dialog,
    Card,
    CardBody,
    Typography,
    Input,
    Textarea,
    Button,
} from "@material-tailwind/react";
import { register } from "../shared/services/auth";

const RegisterModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        confirmPassword: '',
        nik: '',
        alamat: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    // --- LOGIKA VALIDASI ---
    const validate = (name, value) => {
        let error = "";
        
        if (name === "nik") {
            if (!/^\d+$/.test(value)) error = "Harus berupa angka";
            else if (value.length !== 16) error = "Harus 16 digit";
        }
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) error = "Format email salah";
        }
        if (name === "password") {
            if (value.length < 8) error = "Minimal 8 karakter";
        }
        if (name === "confirmPassword") {
            if (value !== formData.password) error = "Password tidak cocok";
        }

        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validate(name, value);
        setApiError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).some(err => err !== "") || formData.password !== formData.confirmPassword) {
            return alert("Periksa kembali inputan Anda");
        }

        setIsLoading(true);
        try {
            await register({
                name: formData.nama,
                email: formData.email,
                password: formData.password,
                nik: formData.nik,
            });
            alert("Registrasi Berhasil!");
            onClose();
        } catch (error) {
            setApiError(error.response?.data?.message || "Registrasi gagal");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog size="md" open={isOpen} handler={onClose} className="bg-transparent shadow-none z-[9999]">
            <Card className="mx-auto w-full max-w-[34rem] border-t-4 border-gold">
                <CardBody className="flex flex-col gap-4 font-jakarta p-8 max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="relative text-center mb-2">
                        <button onClick={onClose} className="absolute -top-2 -right-2 text-gray-400 hover:text-red-500 text-2xl">&times;</button>
                        <Typography variant="h4" color="blue-gray" className="font-playfair font-bold uppercase tracking-tight">
                            Formulir <span className="text-gold">Registrasi</span>
                        </Typography>
                        <Typography className="text-[11px] text-gray-500 font-normal">
                            Lengkapi data diri Anda sesuai dengan KTP untuk melanjutkan layanan.
                        </Typography>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {apiError && <div className="bg-red-50 text-red-600 text-xs p-2 rounded text-center border border-red-100">{apiError}</div>}

                        {/* Row 1: Nama Lengkap */}
                        <div className="w-full">
                            <Input label="Nama Lengkap" name="nama" color="amber" onChange={handleChange} required />
                        </div>

                        {/* Row 2: Email & NIK (Simetris 50:50) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input label="Email" name="email" color="amber" error={!!errors.email} onChange={handleChange} required />
                                {errors.email && <p className="text-[9px] text-red-500 mt-1 ml-1">{errors.email}</p>}
                            </div>
                            <div>
                                <Input label="NIK (16 Digit)" name="nik" maxLength={16} color="amber" error={!!errors.nik} onChange={handleChange} required />
                                {errors.nik && <p className="text-[9px] text-red-500 mt-1 ml-1">{errors.nik}</p>}
                            </div>
                        </div>

                        {/* Row 3: Password & Konfirmasi (Simetris 50:50) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input type="password" label="Password" name="password" color="amber" error={!!errors.password} onChange={handleChange} required />
                                {errors.password && <p className="text-[9px] text-red-500 mt-1 ml-1">{errors.password}</p>}
                            </div>
                            <div>
                                <Input type="password" label="Konfirmasi Password" name="confirmPassword" color="amber" error={!!errors.confirmPassword} onChange={handleChange} required />
                                {errors.confirmPassword && <p className="text-[9px] text-red-500 mt-1 ml-1">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        {/* Row 4: Umur & Alamat (Grid Khusus agar simetris) */}
                        <div className="grid grid-cols-12 items-start">
                            <div className="col-span-12">
                                <Textarea label="Alamat Lengkap" name="alamat" color="amber" rows={1} onChange={handleChange} required />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            fullWidth 
                            disabled={isLoading || Object.values(errors).some(e => e !== "")} 
                            className="bg-gold hover:bg-gold-dark py-4 text-sm tracking-widest font-bold shadow-lg shadow-gold/20"
                        >
                            {isLoading ? "MEMPROSES..." : "KIRIM PENDAFTARAN"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default RegisterModal;