import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    Card,
    CardBody,
    Typography,
    Input,
    Button,
    Checkbox,
} from "@material-tailwind/react";
import Swal from 'sweetalert2'; 
import { login } from "../shared/services/auth";

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        identifier: '', // Email atau NIK
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                email: loginData.identifier,
                password: loginData.password
            };

            const response = await login(payload);
            
            // Ambil role dari response backend (pastikan backend mengirim data user/role)
            const userRole = response.user?.role || "USER";

            // --- ALERT SUKSES ---
            await Swal.fire({
                icon: 'success',
                title: 'Login Berhasil!',
                text: `Selamat datang kembali, ${response.user?.name || 'User'}!`,
                timer: 1500,
                showConfirmButton: false,
                // Memaksa SweetAlert muncul di depan portal modal
                target: document.getElementById('login-modal-dialog') || document.body,
                customClass: {
                    container: 'z-[10001]' 
                }
            });

            onClose();

            // --- REDIRECT BERDASARKAN ROLE ---
            if (userRole === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/user");
            }

            // Refresh halaman agar Navbar mendeteksi status login terbaru
            window.location.reload();

        } catch (error) {
            // --- ALERT GAGAL ---
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: error.response?.data?.message || "Email/NIK atau password salah.",
                confirmButtonColor: '#B8A165',
                target: document.getElementById('login-modal-dialog') || document.body,
                customClass: {
                    container: 'z-[10001]'
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            size="xs"
            open={isOpen}
            handler={onClose}
            id="login-modal-dialog" // ID untuk target SweetAlert2
            className="bg-transparent shadow-none z-[9999]"
        >
            <Card className="mx-auto w-full max-w-[24rem] border-t-4 border-gold">
                <CardBody className="flex flex-col gap-4 font-jakarta relative">
                    {/* Tombol Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gold text-2xl outline-none"
                    >
                        &times;
                    </button>

                    <div className="text-center mb-4">
                        <Typography variant="h4" color="blue-gray" className="font-playfair font-bold">
                            Selamat <span className="text-gold">Datang</span>
                        </Typography>
                        <Typography className="text-xs text-gray-500 mt-1 font-normal">
                            Silakan masuk menggunakan akun DICIPTABINTAR Anda.
                        </Typography>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Typography variant="small" className="font-bold text-gold-dark uppercase tracking-wider text-[11px]">
                                Email / NIK
                            </Typography>
                            <Input
                                name="identifier"
                                placeholder="Masukkan Email atau NIK"
                                className="!border-t-blue-gray-200 focus:!border-gold"
                                labelProps={{ className: "before:content-none after:content-none" }}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Typography variant="small" className="font-bold text-gold-dark uppercase tracking-wider text-[11px]">
                                Password
                            </Typography>
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="!border-t-blue-gray-200 focus:!border-gold"
                                labelProps={{ className: "before:content-none after:content-none" }}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between -ml-2.5">
                            <Checkbox
                                label="Ingat Saya"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{ className: "p-0" }}
                                labelProps={{ className: "text-xs font-normal text-gray-600 ml-2" }}
                            />
                            <Typography as="a" href="#" className="text-xs font-bold text-gold hover:underline outline-none">
                                Lupa Password?
                            </Typography>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            disabled={isLoading}
                            className="bg-gold hover:bg-gold-light shadow-md shadow-gold/20 py-3 mt-2 text-xs font-bold tracking-widest"
                        >
                            {isLoading ? "Memproses..." : "MASUK APLIKASI"}
                        </Button>
                    </form>

                    <Typography className="text-center text-xs text-gray-500 font-normal mt-4">
                        Belum punya akun?{" "}
                        <span
                            onClick={onClose}
                            className="font-bold text-gold cursor-pointer hover:underline"
                        >
                            Daftar Sekarang
                        </span>
                    </Typography>
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default LoginModal;