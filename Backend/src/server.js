import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware, adminOnly } from "./middleware/auth.middleware.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
}); 

// hanya login user
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Data profile",
    user: req.user
  });
});

// hanya admin
app.get("/api/admin", authMiddleware, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin"
  });
});