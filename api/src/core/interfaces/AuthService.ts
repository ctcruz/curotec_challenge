export interface AuthService {
  generateToken(userId: number): string;
  verifyToken(token: string): { userId: number } | null;
}
