import { PostRepository } from "../interfaces/repositories/PostRepository";
import { Post } from "../entities/post.entity";

export class CreatePostUseCase {
  constructor(private readonly postRepo: PostRepository) {}

  async execute(
    postData: Omit<Post, "id" | "createdAt" | "updatedAt">
  ): Promise<Post> {
    return this.postRepo.create(postData);
  }
}
