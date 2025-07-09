export interface Post {
  id?: number;
  title: string;
  content: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
