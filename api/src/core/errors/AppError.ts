export abstract class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
  }
}

export class ValidationError extends AppError {
  constructor(details: { field: string; message: string }[]) {
    super("Validation failed", 422, { errors: details });
  }
}

export class NotFoundError extends AppError {
  constructor(entity: string) {
    super(`${entity} not found`, 404);
  }
}
