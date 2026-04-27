import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware, adminOnly } from "./middleware/auth.middleware.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// 1. Middleware Global (Urutan sangat penting!)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// 2. Pre-flight OPTIONS manual
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// 3. Pindahkan Rute Utama ke ATAS agar mudah dicek
app.get("/", (req, res) => {
  console.log("Koneksi masuk ke rute utama!"); // Untuk debugging di terminal VS Code
  res.send("API Running...");
});

// 4. Routes API
app.use("/api/auth", authRoutes);

// 5. Rute Terproteksi (Pindahkan ke ATAS app.listen)
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Data profile",
    user: req.user
  });
});

app.get("/api/admin", authMiddleware, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin"
  });
});

// 6. Jalankan Server (Harus di paling bawah)
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});