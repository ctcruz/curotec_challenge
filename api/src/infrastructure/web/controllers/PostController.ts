import { Request, Response } from "express";
import { CreatePostRequest } from "../../../application/dto/requests/CreatePostRequest.dto";
import { PostMapper } from "../../../application/mappers/PostMapper";
import { CreatePostUseCase } from "../../../core/usecases/CreatePostUseCase";
import { validate } from "class-validator";

export class PostController {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

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
}
