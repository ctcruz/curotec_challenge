import { IsString, IsNotEmpty, IsEmail } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: "john.doe@email.com"
 *         password:
 *           type: string
 */
export class LoginRequest {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(data: LoginRequest) {
    this.email = data.email;
    this.password = data.password;
  }
}
