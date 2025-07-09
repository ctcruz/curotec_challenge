import bcrypt from "bcrypt";
import { AuthService } from "../interfaces/AuthService";
import { UserRepository } from "../interfaces/repositories/UserRepository";

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    return this.authService.generateToken(user.id!);
  }
}
