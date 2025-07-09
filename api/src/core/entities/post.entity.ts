export interface Post {
  id?: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number; // todo - change to author object
  createdAt?: Date;
}
