import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../core/errors/AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Handling for known errors (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(err.details && { details: err.details }),
    });
    return;
  }

  // Class-validator errors
  if (Array.isArray(err) && err[0]?.constraints) {
    res.status(422).json({
      error: "Validation error",
      details: err.map((e) => ({
        field: e.property,
        messages: Object.values(e.constraints!),
      })),
    });
    return;
  }

  // Unexpected errors (500)
  console.error("[Global Error]", err);
  res.status(500).json({
    error: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
