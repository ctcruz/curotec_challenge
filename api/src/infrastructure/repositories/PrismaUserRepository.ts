import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../core/interfaces/repositories/UserRepository";
import { User } from "../../core/entities/user.entity";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password, // Ensure password is hashed before saving
    };
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password, // Ensure password is hashed before saving
      },
    });
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      password: user.password,
    };
  }
}
