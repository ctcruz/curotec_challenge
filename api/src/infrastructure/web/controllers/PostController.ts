import { Request, Response } from "express";
import { CreatePostRequest } from "../../../application/dto/requests/CreatePostRequest.dto";
import { PostMapper } from "../../../application/mappers/PostMapper";
import { CreatePostUseCase } from "../../../core/usecases/CreatePostUseCase";
import { validateOrReject } from "class-validator";
import { UpdatePostRequest } from "../../../application/dto/requests/UpdatePostRequest.dto";
import { UpdatePostUseCase } from "../../../core/usecases/UpdatePostUseCase";
import { DeletePostUseCase } from "../../../core/usecases/DeletePostUseCase";
import { FindPostUseCase } from "../../../core/usecases/FindPostUseCase";
import { FindAllPostUseCase } from "../../../core/usecases/FindAllPostUseCase";

export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly findPostUseCase: FindPostUseCase,
    private readonly findAllPostUseCase: FindAllPostUseCase
  ) {}

  async create(req: Request, res: Response) {
    const userId = (req as any).userId;
    const createPostRequest = new CreatePostRequest({
      ...req.body,
      authorId: userId,
    });

    await validateOrReject(createPostRequest);

    try {
      const post = await this.createPostUseCase.execute(
        PostMapper.toDomain(createPostRequest)
      );

      const response = PostMapper.toResponse(post);
      return res.status(201).json(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: errorMessage });
      return;
    }
  }

  async update(req: Request, res: Response) {
    const postId = Number(req.params.id);
    const dto = new UpdatePostRequest(req.body);
    await validateOrReject(dto);

    try {
      await this.updatePostUseCase.execute(postId, dto);

      return res.sendStatus(204);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: errorMessage });
      return;
    }
  }

  async delete(req: Request, res: Response) {
    const postId = Number(req.params.id);
    try {
      await this.deletePostUseCase.execute(postId);

      res.sendStatus(204);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: errorMessage });
      return;
    }
  }

  async find(req: Request, res: Response) {
    const postId = Number(req.params.id);

    try {
      const post = await this.findPostUseCase.execute(postId);

      if (post === null) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      const response = PostMapper.toResponse(post);
      res.status(200).json(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: errorMessage });
      return;
    }
  }

  async findAll(req: Request, res: Response) {
    const userId = Number((req as any).userId);

    try {
      const posts = await this.findAllPostUseCase.execute({ authorId: userId });
      const response = posts.map(PostMapper.toResponse);
      res.status(200).json(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: errorMessage });
      return;
    }
  }
}
