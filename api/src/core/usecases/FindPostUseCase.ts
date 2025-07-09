import { Post } from "../entities/post.entity";
import { PostRepository } from "../interfaces/repositories/PostRepository";

export class FindPostUseCase {
  constructor(private readonly postRepo: PostRepository) {}

  async execute(id: number): Promise<Post | null> {
    return this.postRepo.findById(id);
  }
}
