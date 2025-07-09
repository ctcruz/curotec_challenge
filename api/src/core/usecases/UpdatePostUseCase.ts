import { PostRepository } from "../interfaces/repositories/PostRepository";
import { Post } from "../entities/post.entity";
import { UpdatePostRequest } from "../../application/dto/requests/UpdatePostRequest.dto";

export class UpdatePostUseCase {
  constructor(private readonly postRepo: PostRepository) {}

  async execute(id: number, postData: UpdatePostRequest): Promise<Post> {
    return this.postRepo.update(id, postData);
  }
}
