import { Post } from "../entities/post.entity";
import {
  FindAllPostParams,
  PostRepository,
} from "../interfaces/repositories/PostRepository";
import { UserRepository } from "../interfaces/repositories/UserRepository";

export class FindAllPostUseCase {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly userRepo: UserRepository
  ) {}

  async execute({ authorId }: FindAllPostParams): Promise<Post[]> {
    const authorExists = await this.userRepo.findById(authorId);
    if (!authorExists) {
      throw new Error("Author not found");
    }
    return this.postRepo.findAll({ authorId });
  }
}
