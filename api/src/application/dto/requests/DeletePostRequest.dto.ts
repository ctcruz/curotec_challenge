import { IsNotEmpty, IsNumber } from "class-validator";

export class DeletePostRequest {
  @IsNumber()
  @IsNotEmpty()
  id!: string;

  constructor(dto: DeletePostRequest) {
    Object.assign(this, dto);
  }
}
