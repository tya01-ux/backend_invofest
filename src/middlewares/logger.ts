import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const checkAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.user; // Diambil dari data hasil decode middleware authenticate

  if (!user) {
    return res.status(401).json({ message: "Unauthorized. Anda belum login" });
  }

  // VALIDASI Kunci email khusus yang bertindak sebagai Admin Utama
  const namaEmailAdmin = "admin@invofest.com"; // Sesuaikan dengan email admin pilihanmu

  if (user.email !== namaEmailAdmin) {
    return res.status(403).json({ message: "Forbidden: Akses ditolak, khusus Admin!" });
  }

  next();
};