import { UserRepository } from "../interfaces/repositories/UserRepository";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
