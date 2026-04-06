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
import Swal from 'sweetalert2'; // Import SweetAlert2
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (Object.values(errors).some(err => err !== "") || formData.password !== formData.confirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Data Tidak Valid',
                text: 'Silakan periksa kembali isian formulir Anda.',
                target: document.getElementById('register-modal-dialog'),
                customClass: { container: 'z-[10001]' }
            });
        }

        setIsLoading(true);
        try {
            await register({
                name: formData.nama,
                email: formData.email,
                password: formData.password,
                nik: formData.nik,
                // Tambahkan field lain jika backend sudah mendukung
            });

            // --- ALERT SUKSES ---
            await Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil!',
                text: 'Akun Anda telah dibuat. Silakan masuk untuk melanjutkan.',
                confirmButtonColor: '#B8A165',
                target: document.getElementById('register-modal-dialog'),
                customClass: { container: 'z-[10001]' }
            });

            onClose();
        } catch (error) {
            // --- ALERT GAGAL ---
            Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal',
                text: error.response?.data?.message || "Terjadi kesalahan saat mendaftar.",
                confirmButtonColor: '#B8A165',
                target: document.getElementById('register-modal-dialog'),
                customClass: { container: 'z-[10001]' }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog 
            size="md" 
            open={isOpen} 
            handler={onClose} 
            id="register-modal-dialog" // ID untuk target SweetAlert2
            className="bg-transparent shadow-none z-[9999]"
        >
            <Card className="mx-auto w-full max-w-[34rem] border-t-4 border-gold font-jakarta">
                <CardBody className="flex flex-col gap-4 p-8 max-h-[90vh] overflow-y-auto">
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
                        {/* Row 1: Nama Lengkap */}
                        <div className="w-full">
                            <Input label="Nama Lengkap" name="nama" color="amber" onChange={handleChange} required />
                        </div>

                        {/* Row 2: Email & NIK */}
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

                        {/* Row 3: Password & Konfirmasi */}
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

                        {/* Row 4: Alamat */}
                        <div className="w-full">
                            <Textarea label="Alamat Lengkap" name="alamat" color="amber" rows={2} onChange={handleChange} required />
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