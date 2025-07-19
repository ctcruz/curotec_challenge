import { UserRepository } from "../../core/interfaces/repositories/UserRepository";
import { User } from "../../core/entities/user.entity";
import { PrismaClient } from "../../generated/prisma";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return user;
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return createdUser;
  }
}
