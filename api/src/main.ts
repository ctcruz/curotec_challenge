import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma";
import { errorHandler } from "./infrastructure/web/middleware/errorHandler";
import { requestLogger } from "./infrastructure/web/middleware/requestLogger";
import { setupSwagger } from "./infrastructure/web/docs/swagger-setup";
import { postRouter, authRouter } from "./infrastructure/web/routes";

// Initial setup
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(express.json());
app.use(requestLogger);
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/posts", postRouter);

setupSwagger(app);

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
