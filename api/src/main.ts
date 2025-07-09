import express from "express";
import { PrismaClient } from "./generated/prisma";
import { errorHandler } from "./infrastructure/web/middleware/errorHandler";
import { requestLogger } from "./infrastructure/web/middleware/requestLogger";

// Initial setup
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(express.json());
app.use(requestLogger);

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
