import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/db.js";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return res.status(400).json({ message: "Email tidak ditemukan" });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Password salah" });
  }

  // PERBAIKAN: Masukkan email ke dalam token JWT agar checkAdmin berfungsi
  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    process.env.JWT_SECRET || "secret_key",
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Login berhasil",
    token,
    user: {
      name: existingUser.name,
      email: existingUser.email,
    },
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, foto, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nama, email, dan password harus diisi" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "Email sudah terdaftar" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // VALIDASI FOTO: Jika kosong, pasang avatar default di database
  const finalFoto = foto && foto.trim() !== "" ? foto : "https://i.pravatar.cc/150";

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      foto: finalFoto,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    message: "User berhasil didaftarkan",
    user: {
      name: newUser.name,
      email: newUser.email,
      foto: newUser.foto,
    },
  });
};