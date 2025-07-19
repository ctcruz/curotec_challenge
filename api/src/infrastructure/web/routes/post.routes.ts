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
import { PrismaUserRepository } from "../../repositories/PrismaUserRepository";

const prisma = new PrismaClient();

// Dependency Injection
const userRepository = new PrismaUserRepository(prisma);
const postRepository = new PrismaPostRepository(prisma);
const createPostUseCase = new CreatePostUseCase(postRepository);
const updatePostUseCase = new UpdatePostUseCase(postRepository);
const deletePostUseCase = new DeletePostUseCase(postRepository);
const findPostUseCase = new FindPostUseCase(postRepository);
const findAllPostUseCase = new FindAllPostUseCase(
  postRepository,
  userRepository
);

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

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostRequest'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostResponse'
 *       400:
 *         description: Invalid input
 */
router.post(
  "/posts",
  asyncHandler((req, res) => postController.create(req, res))
);

/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePostRequest'
 *     responses:
 *       204:
 *         description: Post updated
 *       404:
 *         description: Post not found
 */
router.patch(
  "/posts/:id",
  asyncHandler((req, res) => postController.update(req, res))
);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Post ID
 *     responses:
 *       204:
 *         description: Post deleted
 *       404:
 *         description: Post not found
 */
router.delete(
  "/posts/:id",
  asyncHandler((req, res) => postController.delete(req, res))
);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostResponse'
 *       404:
 *         description: Post not found
 */
router.get(
  "/posts/:id",
  asyncHandler((req, res) => postController.find(req, res))
);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostResponse'
 */
router.get(
  "/posts",
  asyncHandler((req, res) => postController.findAll(req, res))
);

export const postRouter = router;
