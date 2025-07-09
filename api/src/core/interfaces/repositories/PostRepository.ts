import { Post } from "../../entities/post.entity";

export interface PostRepository {
  create(post: Omit<Post, "id">): Promise<Post>;
  findById(id: number): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  update(id: number, post: Partial<Post>): Promise<Post>;
  delete(id: number): Promise<void>;
}
