import { IsString, IsBoolean, IsOptional, IsNotEmpty } from "class-validator";

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
