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
