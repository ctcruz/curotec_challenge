import { PostRepository } from "../../core/interfaces/repositories/PostRepository";
import { Post } from "../../core/entities/post.entity";
import { PrismaClient } from "../../generated/prisma";

export class PrismaPostRepository implements PostRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async update(id: number, post: Partial<Post>): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: post,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }

  async create(post: Omit<Post, "id">): Promise<Post> {
    return this.prisma.post.create({ data: post });
  }

  async findById(id: number): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    return post;
  }
}
