import { User } from "../../core/entities/user.entity";
import { RegisterRequest } from "../dto/requests/RegisterRequest.dto";
import { UserResponse } from "../dto/responses/UserResponse.dto";

export class UserMapper {
  // Convert request DTO to domain entity
  static toDomain(dto: RegisterRequest): User {
    return {
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
  }

  // Convert domain entity to response DTO
  static toResponse(user: User): UserResponse {
    return new UserResponse(user.id!, user.name, user.email);
  }
}
