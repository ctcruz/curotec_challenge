import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNotEmpty,
} from "class-validator";

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
