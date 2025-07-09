import { PostRepository } from "../interfaces/repositories/PostRepository";

export class DeletePostUseCase {
  constructor(private readonly postRepo: PostRepository) {}

  async execute(id: number): Promise<void> {
    return this.postRepo.delete(id);
  }
}
