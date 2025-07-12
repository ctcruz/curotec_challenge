import { Request, Response } from "express";
import { RegisterUseCase } from "../../../core/usecases/RegisterUseCase";
import { LoginUseCase } from "../../../core/usecases/LoginUseCase";

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.loginUseCase.execute(email, password);
    res.json({ token });
  }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await this.registerUseCase.execute(name, email, password);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
