import { Request, Response } from "express";
import { RegisterUseCase } from "../../../core/usecases/RegisterUseCase";
import { LoginUseCase } from "../../../core/usecases/LoginUseCase";
import { UserMapper } from "../../../application/mappers/UserMapper";
import { validateOrReject } from "class-validator";
import { RegisterRequest } from "../../../application/dto/requests/RegisterRequest.dto";
import { LoginRequest } from "../../../application/dto/requests/LoginRequest.dto";

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginRequest = new LoginRequest(req.body);
    await validateOrReject(loginRequest);

    try {
      const token = await this.loginUseCase.execute(email, password);
      res.status(200).json({ token });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
      return;
    }
  }

  async register(req: Request, res: Response) {
    const createUserRequest = new RegisterRequest(req.body);
    await validateOrReject(createUserRequest);

    const user = UserMapper.toDomain(createUserRequest);
    try {
      const userRegistered = await this.registerUseCase.execute(user);

      const response = UserMapper.toResponse(userRegistered);
      res.status(200).json(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
      return;
    }
  }
}
