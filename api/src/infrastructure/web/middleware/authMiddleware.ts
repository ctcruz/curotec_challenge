import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../../core/interfaces/AuthService";

export function authMiddleware(authService: AuthService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const payload = authService.verifyToken(token);
    if (!payload) return res.status(401).json({ error: "Invalid token" });

    req.userId = payload.userId;
    next();
  };
}
