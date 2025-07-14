import { PostRepository } from "../interfaces/repositories/PostRepository";

export class DeletePostUseCase {
  constructor(private readonly postRepo: PostRepository) {}

  async execute(id: number): Promise<void> {
    await this.postRepo.delete(id);
  }
}
