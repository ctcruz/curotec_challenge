import { UserRepository } from "../interfaces/repositories/UserRepository";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    usertData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(usertData.email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(usertData.password, 10);
    return this.userRepository.create({
      ...usertData,
      password: hashedPassword,
    });
  }
}
