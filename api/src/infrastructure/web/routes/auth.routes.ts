import { Router } from "express";

import { LoginUseCase } from "../../../core/usecases/LoginUseCase";
import { RegisterUseCase } from "../../../core/usecases/RegisterUseCase";
import { PrismaUserRepository } from "../../repositories/PrismaUserRepository";
import { JwtAuthService } from "../../services/JwtAuthService";
import { AuthController } from "../controllers/AuthController";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

// JWT Setup
const authService = new JwtAuthService(process.env.JWT_SECRET!);
const userRepository = new PrismaUserRepository(prisma);
const registerUseCase = new RegisterUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository, authService);

const router = Router();

const authController = new AuthController(loginUseCase, registerUseCase);
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

export const authRouter = router;
