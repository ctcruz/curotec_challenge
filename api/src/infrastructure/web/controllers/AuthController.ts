import { Request, Response } from "express";
import { RegisterUseCase } from "../../../core/usecases/RegisterUseCase";
import { LoginUseCase } from "../../../core/usecases/LoginUseCase";
import { UserMapper } from "../../../application/mappers/UserMapper";
import { validateOrReject } from "class-validator";
import { RegisterRequest } from "../../../application/dto/requests/RegisterRequest.dto";

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.loginUseCase.execute(email, password);
    res.status(200).json({ token });
  }

  async register(req: Request, res: Response) {
    const createUserRequest = new RegisterRequest(req.body);
    await validateOrReject(createUserRequest);

    const user = UserMapper.toDomain(createUserRequest);
    const userRegistered = await this.registerUseCase.execute(user);

    const response = UserMapper.toResponse(userRegistered);
    res.status(200).json(response);
  }
}
