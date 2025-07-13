import { IsString, IsNotEmpty, IsEmail } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john.doe@email.com"
 *         password:
 *           type: string
 */
export class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(data: RegisterRequest) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}
