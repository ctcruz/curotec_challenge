import express from "express";
import { PrismaClient } from "./generated/prisma";
import { errorHandler } from "./infrastructure/web/middleware/errorHandler";
import { requestLogger } from "./infrastructure/web/middleware/requestLogger";
import { PrismaPostRepository } from "./infrastructure/repositories/PrismaPostRepository";
import { CreatePostUseCase } from "./core/usecases/CreatePostUseCase";
import { PostController } from "./infrastructure/web/controllers/PostController";
import { JwtAuthService } from "./infrastructure/services/JwtAuthService";
import { PrismaUserRepository } from "./infrastructure/repositories/PrismaUserRepository";
import { RegisterUseCase } from "./core/usecases/RegisterUseCase";
import { LoginUseCase } from "./core/usecases/LoginUseCase";
import { AuthController } from "./infrastructure/web/controllers/AuthController";
import { authMiddleware } from "./infrastructure/web/middleware/authMiddleware";
import { UpdatePostUseCase } from "./core/usecases/UpdatePostUseCase";
import { DeletePostUseCase } from "./core/usecases/DeletePostUseCase";
import { FindPostUseCase } from "./core/usecases/FindPostUseCase";
import { FindAllPostUseCase } from "./core/usecases/FindAllPostUseCase";

// Initial setup
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(express.json());
app.use(requestLogger);

// Dependency Injection
const postRepository = new PrismaPostRepository(prisma);
const createPostUseCase = new CreatePostUseCase(postRepository);
const updatePostUseCase = new UpdatePostUseCase(postRepository);
const deletePostUseCase = new DeletePostUseCase(postRepository);
const findPostUseCase = new FindPostUseCase(postRepository);
const findAllPostUseCase = new FindAllPostUseCase(postRepository);

// JWT Setup
const authService = new JwtAuthService(process.env.JWT_SECRET!);
const userRepository = new PrismaUserRepository(prisma);
const registerUseCase = new RegisterUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository, authService);

// Routes
const authController = new AuthController(loginUseCase, registerUseCase);
app.post("/auth/register", (req, res) => authController.register(req, res));
app.post("/auth/login", (req, res) => authController.login(req, res));

const postController = new PostController(
  createPostUseCase,
  updatePostUseCase,
  deletePostUseCase,
  findPostUseCase,
  findAllPostUseCase
);

const protectedRouter = express.Router();
protectedRouter.use(authMiddleware(authService));

protectedRouter.post("/post", (req, res) => postController.create(req, res));
protectedRouter.patch("/post/:id", (req, res) =>
  postController.update(req, res)
);
protectedRouter.delete("/post/:id", (req, res) =>
  postController.delete(req, res)
);
protectedRouter.get("/post/:id", (req, res) => postController.find(req, res));
protectedRouter.get("/posts", (req, res) => postController.findAll(req, res));

app.use(protectedRouter);

// Error Handler Middleware
app.use(errorHandler);

// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
