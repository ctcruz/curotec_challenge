// src/tests/unit/usecases/CreatePost.spec.ts
import { CreatePostUseCase } from "../../../core/usecases/CreatePostUseCase";
import { MockPostRepository } from "../../mocks/MockPostRepository";

describe("CreatePost UseCase", () => {
  let createPost: CreatePostUseCase;
  let mockRepo: MockPostRepository;

  beforeEach(() => {
    mockRepo = new MockPostRepository();
    createPost = new CreatePostUseCase(mockRepo);
  });

  it("should create a new post", async () => {
    const postData = { title: "Test", content: "Content", published: false };
    const result = await createPost.execute(postData);

    expect(result.title).toBe("Test");
    expect(mockRepo.create).toHaveBeenCalledWith(postData);
  });

  it("should throw error when title is empty", async () => {
    await expect(
      createPost.execute({ title: "", content: "Content", published: false })
    ).rejects.toThrow("Title is required");
  });
});
