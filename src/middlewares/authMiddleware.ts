import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: {
    userId: number;
    email?: string;
  };
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // 1. JIKA HEADER KOSONG (Ditambahkan tanda seru !)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthenticated, format tidak valid" // Diubah ke 'message'
    });
  }

  // 2. DAPATKAN TOKEN (Gunakan spasi pada split(" "))
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token tidak ditemukan"
    });
  }

  // 3. VERIFIKASI TOKEN
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key") as { userId: number; email?: string };
    
    // Menyimpan hasil decode ke dalam request agar bisa dibaca middleware berikutnya (seperti checkAdmin)
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token atau token kadaluarsa"
    });
  }
};

// MIDDLEWARE CHECK ADMIN
export const checkAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized. Anda belum login" });
  }

  const namaEmailAdmin = "admin@invofest.com"; // Sesuaikan dengan email admin pilihanmu

  if (user.email !== namaEmailAdmin) {
    return res.status(403).json({ message: "Forbidden: Akses ditolak, khusus Admin!" });
  }

  next();
};