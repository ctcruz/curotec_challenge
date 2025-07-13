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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Validation error
 */
router.post("/auth/register", (req, res) => authController.register(req, res));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login an user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Unauthorized
 */
router.post("/auth/login", (req, res) => authController.login(req, res));

export const authRouter = router;
