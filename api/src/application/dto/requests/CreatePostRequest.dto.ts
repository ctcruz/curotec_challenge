export class CreatePostRequest {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly published?: boolean
  ) {}

  static validate(data: any): data is CreatePostRequest {
    return data.title && typeof data.title === "string";
  }
}
