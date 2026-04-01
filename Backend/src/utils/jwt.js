import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret123";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    SECRET,
    { expiresIn: "1d" },
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
