import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 1. Perbaikan: Cek apakah header diawali dengan "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Sesi tidak valid, silakan login kembali" });
        }

        const token = authHeader.split(" ")[1];

        // 2. Verifikasi Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Simpan data user ke req.user
        // Pastikan di dalam token JWT kamu saat login, kamu sudah memasukkan { id, role, email }
        req.user = decoded;

        next();
    } catch (error) {
        // Cek jika error spesifik karena expired
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Sesi Anda telah berakhir, silakan login ulang" });
        }
        return res.status(401).json({ message: "Token tidak valid" });
    }
};

export const adminOnly = (req, res, next) => {
    // 4. Perbaikan: Gunakan optional chaining (?.) untuk menghindari error jika req.user undefined
    if (req.user?.role !== "ADMIN") {
        return res.status(403).json({ message: "Akses ditolak: Hanya untuk Admin" });
    }
    next();
};