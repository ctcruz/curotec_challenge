import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../../core/interfaces/AuthService";

export const authMiddleware = (authService: AuthService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    try {
      const payload = authService.verifyToken(token);

      if (!payload || !payload.userId) {
        res.status(401).json({ error: "Token inválido" });
        return;
      }

      (req as any).userId = payload.userId;
      next();
    } catch (error) {
      res.status(401).json({ error: "Falha na autenticação" });
    }
  };
};
