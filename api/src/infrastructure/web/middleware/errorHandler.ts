import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../core/errors/AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Tratamento para erros conhecidos (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(err.details && { details: err.details }),
    });
    return;
  }

  // // Tratamento para erros de validação (class-validator)
  // if (err.name === "ValidationError") {
  //   // Exemplo para erros do class-validator
  //   res.status(422).json({
  //     error: "Validation error",
  //     details: err,
  //   });
  //   return;
  // }

  if (Array.isArray(err) && err[0]?.constraints) {
    // Erros do class-validator
    res.status(422).json({
      error: "Validation error",
      details: err.map((e) => ({
        field: e.property,
        messages: Object.values(e.constraints!),
      })),
    });
    return;
  }

  // Erros inesperados (500)
  console.error("[Global Error]", err);
  res.status(500).json({
    error: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
