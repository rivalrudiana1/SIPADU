import axios from "axios";

// 1. Ambil URL dari .env (Vite)
// Jika .env tidak terbaca, dia akan fallback ke localhost:5000 sebagai cadangan
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// 2. Tambahkan /api di belakang URL jika backend kamu menggunakan prefix /api
// Contoh: https://...trycloudflare.com/api
const baseURL = `${API_BASE_URL}/api`;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor → handle error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tambahkan pengecekan agar tidak terjadi infinite loop saat logout
    if (error.response?.status === 401 && !window.location.pathname.includes("/login")) {
      localStorage.removeItem("token");
      // Gunakan window.location.replace agar tidak bisa di-back
      window.location.replace("/"); 
    }

    return Promise.reject(error);
  },
);