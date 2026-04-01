import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import prisma from "../config/prisma.js";

const prisma = new PrismaClient();

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, contact, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        contact,
        password: hashedPassword,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { contact, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { contact },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
