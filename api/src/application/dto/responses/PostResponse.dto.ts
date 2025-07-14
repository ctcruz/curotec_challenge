/**
 * @swagger
 * components:
 *   schemas:
 *     PostResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         title:
 *           type: string
 *           example: "My first post"
 *         content:
 *           type: string
 *           example: "This is the content of my first post."
 *         published:
 *           type: boolean
 *           default: true
 *         authorId:
 *           type: number
 *         createdAt:
 *           type: string
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
