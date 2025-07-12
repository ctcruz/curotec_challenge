import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { authMiddleware } from "../middleware/authMiddleware";
import { JwtAuthService } from "../../services/JwtAuthService";
import { asyncHandler } from "../utils/asyncHandler";
import { PrismaPostRepository } from "../../repositories/PrismaPostRepository";
import { CreatePostUseCase } from "../../../core/usecases/CreatePostUseCase";
import { Prisma } from "../../../generated/prisma";
import { UpdatePostUseCase } from "../../../core/usecases/UpdatePostUseCase";
import { DeletePostUseCase } from "../../../core/usecases/DeletePostUseCase";
import { FindPostUseCase } from "../../../core/usecases/FindPostUseCase";
import { FindAllPostUseCase } from "../../../core/usecases/FindAllPostUseCase";

const postRepository = new PrismaPostRepository(Prisma);
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

// const protectedRouter = express.Router();
router.use(authMiddleware(authService));

// router.post("/post", (req, res) => postController.create(req, res));

export default router;
