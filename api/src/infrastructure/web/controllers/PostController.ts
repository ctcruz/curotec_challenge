import { Request, Response } from "express";
import { CreatePostRequest } from "../../../application/dto/requests/CreatePostRequest.dto";
import { PostMapper } from "../../../application/mappers/PostMapper";
import { CreatePostUseCase } from "../../../core/usecases/CreatePostUseCase";
import { validate } from "class-validator";
import { UpdatePostRequest } from "../../../application/dto/requests/UpdatePostRequest.dto";
import { UpdatePostUseCase } from "../../../core/usecases/UpdatePostUseCase";
import { DeletePostRequest } from "../../../application/dto/requests/DeletePostRequest.dto";
import { DeletePostUseCase } from "../../../core/usecases/DeletePostUseCase";

export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const dto = new CreatePostRequest({
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.authorId,
        published: req.body.published,
      });

      const errors = await validate(dto, {
        stopAtFirstError: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

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

  async update(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.id, 10);
      const dto = new UpdatePostRequest(req.body);

      const errors = await validate(dto, {
        stopAtFirstError: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const post = await this.updatePostUseCase.execute(postId, dto);

      const response = PostMapper.toResponse(post);
      res.status(201).json(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.id, 10);

      await this.deletePostUseCase.execute(postId);

      res.status(201).json({ message: "Post deleted successfully" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  }
}
