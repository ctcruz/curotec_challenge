/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john.doe@email.com"
 */
export class UserResponse {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string
  ) {}
}
