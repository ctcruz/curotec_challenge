import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";

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
 *           minLength: 2
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john.due@email.com"
 *         password:
 *           type: string
 *           minLength: 6
 */
export class RegisterRequest {
  @IsString()
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @IsNotEmpty()
  password: string;

  constructor(data: RegisterRequest) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}
