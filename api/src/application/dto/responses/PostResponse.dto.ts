/**
 * @swagger
 * components:
 *   schemas:
 *     PostResponse:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 5
 *           example: "Meu primeiro post"
 *         content:
 *           type: string
 *           example: "Conteúdo do post"
 *         published:
 *           type: boolean
 *           default: false
 */
export class PostResponse {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly content: string,
    public readonly published: boolean,
    public readonly authorId: number,
    public readonly createdAt: Date
  ) {}
}
