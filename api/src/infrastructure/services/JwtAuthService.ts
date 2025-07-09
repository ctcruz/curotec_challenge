import jwt from "jsonwebtoken";
import { AuthService } from "../../core/interfaces/AuthService";

export class JwtAuthService implements AuthService {
  constructor(private readonly secretKey: string) {}

  generateToken(userId: number): string {
    return jwt.sign({ userId }, this.secretKey, { expiresIn: "1h" });
  }

  verifyToken(token: string): { userId: number } | null {
    try {
      return jwt.verify(token, this.secretKey) as { userId: number };
    } catch {
      return null;
    }
  }
}
