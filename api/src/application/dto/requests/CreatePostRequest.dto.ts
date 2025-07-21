import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNotEmpty,
} from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePostRequest:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - published
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           example: "My first post"
 *         content:
 *           type: string
 *           minLength: 1
 *           description: "Content of the post"
 *           example: "This is the content of my first post."
 *         published:
 *           type: boolean
 *           default: true
 */
export class CreatePostRequest {
  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsNotEmpty()
  authorId: number;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  constructor(data: CreatePostRequest) {
    this.title = data.title;
    this.content = data.content;
    this.authorId = data.authorId;
    this.published = data.published;
  }
}
