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
// Import layanan auth kamu
import { login } from "../shared/services/auth";

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        identifier: '', // Email atau NIK
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setErrorMsg(""); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        try {
            const payload = {
                email: loginData.identifier, 
                password: loginData.password
            };

            await login(payload);
            onClose(); 
            navigate("/user"); // Sesuaikan dengan route dashboard kamu
            
        } catch (error) {
            setErrorMsg(
                error.response?.data?.message || "Login gagal. Periksa kembali data Anda."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            size="xs"
            open={isOpen}
            handler={onClose}
            className="bg-transparent shadow-none z-[9999]"
        >
            <Card className="mx-auto w-full max-w-[24rem] border-t-4 border-gold">
                <CardBody className="flex flex-col gap-4 font-jakarta relative">
                    {/* Tombol Close */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gold text-2xl"
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
                        {/* Notifikasi Error */}
                        {errorMsg && (
                            <div className="bg-red-50 text-red-600 text-[13px] p-3 rounded-md text-center border border-red-100">
                                {errorMsg}
                            </div>
                        )}

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
                            <Typography as="a" href="#" className="text-xs font-bold text-gold hover:underline">
                                Lupa Password?
                            </Typography>
                        </div>

                        <Button 
                            type="submit"
                            fullWidth
                            disabled={isLoading}
                            className="bg-gold hover:bg-gold-light shadow-md shadow-gold/20 py-3 mt-2"
                        >
                            {isLoading ? "Memproses..." : "Masuk Aplikasi"}
                        </Button>
                    </form>

                    <Typography className="text-center text-xs text-gray-500 font-normal mt-4">
                        Belum punya akun?{" "}
                        <span 
                            onClick={onClose} // Biasanya di sini diarahkan untuk buka Modal Register
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