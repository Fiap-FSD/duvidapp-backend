import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../src/post/controllers/post.controller';
import { PostService } from '../src/post/services/post.service';

describe('PostController', () => {
  let postController: PostController;
  let postService: Partial<PostService>;

  beforeEach(async () => {
    postService = {
      getAllPost: jest.fn(),
      getPostById: jest.fn(),
      createPost: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [{ provide: PostService, useValue: postService }],
    }).compile();

    postController = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
  });

  describe('getAllPost', () => {
    it('should return all posts', async () => {
      const mockPosts = [
        { id: '1', title: 'Test Post', intro: 'Intro', content: 'Content' },
      ];
      jest.spyOn(postService, 'getAllPost').mockResolvedValue(mockPosts);

      const result = await postController.getAllPost(10, 1);

      expect(result).toEqual(mockPosts);
      expect(postService.getAllPost).toHaveBeenCalledWith(10, 1);
    });
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      const createDto = { title: 'Test', intro: 'Intro', content: 'Content' };
      const createdPost = { id: '1', ...createDto };

      jest.spyOn(postService, 'createPost').mockResolvedValue(createdPost);

      const result = await postController.createPost(createDto);

      expect(result).toEqual(createdPost);
      expect(postService.createPost).toHaveBeenCalledWith(createDto);
    });
  });
});
