import { Post } from "../entities/post.entity";
import { PostRepository } from "../interfaces/repositories/PostRepository";

export class FindAllPostUseCase {
  constructor(private readonly postRepo: PostRepository) {}

  async execute(id: number): Promise<Post[]> {
    return this.postRepo.findAll();
  }
}
