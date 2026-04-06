import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// REGISTER (Update agar sesuai dengan Frontend kamu)
router.post("/register", async (req, res) => {
  try {
    // Tambahkan field yang dikirim dari Frontend
    const { name, email, password, nik, umur, alamat } = req.body;

    if (!name || !email || !password || !nik) {
      return res.status(400).json({
        message: "Data wajib (Nama, Email, Password, NIK) harus diisi",
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email sudah terdaftar" });

    // Cek juga NIK agar unik jika perlu
    const existingNIK = await prisma.user.findFirst({ where: { nik } });
    if (existingNIK)
      return res.status(400).json({ message: "NIK sudah terdaftar" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        nik, // Pastikan field ini ada di schema.prisma
        role: "USER", // Default tetap USER
      },
    });

    res.json({
      message: "Register berhasil",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password wajib" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        nik: true,
        // Jangan sertakan password di sini
      },
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
});

export default router;
