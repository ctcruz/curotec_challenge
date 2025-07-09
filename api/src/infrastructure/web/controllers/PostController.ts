import { Request, Response } from "express";
import { CreatePostRequest } from "../../../application/dto/requests/CreatePostRequest.dto";
import { PostMapper } from "../../../application/mappers/PostMapper";
import { CreatePostUseCase } from "../../../core/usecases/CreatePostUseCase";

export class PostController {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

  async create(req: Request, res: Response) {
    try {
      const dto = new CreatePostRequest(req.body.title, req.body.content);
      const post = await this.createPostUseCase.execute(
        PostMapper.toDomain(dto)
      );
      const response = PostMapper.toResponse(post);
      res.status(201).json(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  }
}
