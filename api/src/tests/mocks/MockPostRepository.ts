import { Post } from "../../core/entities/post.entity";
import { PostRepository } from "../../core/interfaces/repositories/PostRepository";

export class MockPostRepository implements PostRepository {
  findById(id: number): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  update(id: number, post: Partial<Post>): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  create = jest.fn(async (post: Post) => ({
    ...post,
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}
