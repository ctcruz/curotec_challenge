import { IsString, IsBoolean, IsOptional, IsNotEmpty } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdatePostRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 5
 *           example: "My updated post"
 *         content:
 *           type: string
 *           example: "This is the updated content of my post."
 *         published:
 *           type: boolean
 *           default: false
 */
export class UpdatePostRequest {
  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  @IsOptional()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content!: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  constructor(dto: Partial<UpdatePostRequest>) {
    Object.assign(this, dto);
  }
}
