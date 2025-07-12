import { IsNotEmpty, IsNumber } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     DeletePostRequest:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           minLength: 5
 *           example: "Meu primeiro post"
 */
export class DeletePostRequest {
  @IsNumber()
  @IsNotEmpty()
  id!: string;

  constructor(dto: DeletePostRequest) {
    Object.assign(this, dto);
  }
}
