import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { authMiddleware } from "../middleware/authMiddleware";
import { JwtAuthService } from "../../services/JwtAuthService";
import { asyncHandler } from "../utils/asyncHandler";
import { PrismaPostRepository } from "../../repositories/PrismaPostRepository";
import { CreatePostUseCase } from "../../../core/usecases/CreatePostUseCase";
import { PrismaClient } from "../../../generated/prisma";
import { UpdatePostUseCase } from "../../../core/usecases/UpdatePostUseCase";
import { DeletePostUseCase } from "../../../core/usecases/DeletePostUseCase";
import { FindPostUseCase } from "../../../core/usecases/FindPostUseCase";
import { FindAllPostUseCase } from "../../../core/usecases/FindAllPostUseCase";

const prisma = new PrismaClient();

// Dependency Injection
const postRepository = new PrismaPostRepository(prisma);
const createPostUseCase = new CreatePostUseCase(postRepository);
const updatePostUseCase = new UpdatePostUseCase(postRepository);
const deletePostUseCase = new DeletePostUseCase(postRepository);
const findPostUseCase = new FindPostUseCase(postRepository);
const findAllPostUseCase = new FindAllPostUseCase(postRepository);

const authService = new JwtAuthService(process.env.JWT_SECRET!);
const postController = new PostController(
  createPostUseCase,
  updatePostUseCase,
  deletePostUseCase,
  findPostUseCase,
  findAllPostUseCase
);

const router = Router();
router.use(authMiddleware(authService));

// Routes
router.post(
  "/",
  asyncHandler((req, res) => postController.create(req, res))
);
router.patch(
  "/:id",
  asyncHandler((req, res) => postController.update(req, res))
);
router.delete(
  "/:id",
  asyncHandler((req, res) => postController.delete(req, res))
);
router.get(
  "/:id",
  asyncHandler((req, res) => postController.find(req, res))
);
router.get(
  "/",
  asyncHandler((req, res) => postController.findAll(req, res))
);

export const postRouter = router;
