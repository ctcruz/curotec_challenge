import { Post } from "../../core/entities/post.entity";
import { CreatePostRequest } from "../dto/requests/CreatePostRequest.dto";
import { PostResponse } from "../dto/responses/PostResponse.dto";

export class PostMapper {
  // Convert request DTO to domain entity
  static toDomain(dto: CreatePostRequest): Post {
    return {
      title: dto.title,
      content: dto.content,
      published: dto.published ?? true,
      authorId: dto.authorId,
    };
  }

  // Convert domain entity to response DTO
  static toResponse(post: Post): PostResponse {
    return new PostResponse(
      post.id!,
      post.title,
      post.content,
      post.published,
      post.authorId,
      post.createdAt!
    );
  }
}
