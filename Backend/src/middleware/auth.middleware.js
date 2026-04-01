import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // ambil token dari header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token tidak ada" });
    }

    // format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token tidak valid" });
    }

    // verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // simpan user ke request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid / expired" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Akses ditolak" });
  }
  next();
};
