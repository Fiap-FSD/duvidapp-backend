import { PostService } from '../services/post.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PostController } from './post.controller';

// Mocking the AuthGuard globally
jest.mock('../../shared/guards/auth.guard', () => ({
  AuthGuard: jest.fn(() => ({
    canActivate: jest.fn(() => true),
  })),
}));

// Mocking the PostService
const mockPostService = {
  searchPosts: jest.fn(),
  getAllPost: jest.fn(),
  getPostById: jest.fn(),
  createPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
};

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchPosts', () => {
    it('should throw BadRequestException if keyword is not provided', async () => {
      await expect(controller.searchPosts('')).rejects.toThrow(BadRequestException);
    });

    it('should call searchPosts with the correct keyword', async () => {
      const keyword = 'test';
      await controller.searchPosts(keyword);
      expect(service.searchPosts).toHaveBeenCalledWith(keyword);
    });
  });

  describe('getAllPost', () => {
    it('should get all posts with given limit and page', async () => {
      const limit = 10;
      const page = 1;
      await controller.getAllPost(limit, page);
      expect(service.getAllPost).toHaveBeenCalledWith(limit, page);
    });
  });

  describe('getPostById', () => {
    it('should get post by id', async () => {
      const postId = '1';
      await controller.getPostById(postId);
      expect(service.getPostById).toHaveBeenCalledWith(postId);
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const post = { title: 'Title', content: 'Content', intro: 'Intro' };
      await controller.createPost(post);
      expect(service.createPost).toHaveBeenCalledWith(post);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const postId = '1';
      const post = { title: 'New Title', content: 'New Content', intro: 'New Intro' };
      await controller.updatePost(postId, post);
      expect(service.updatePost).toHaveBeenCalledWith(postId, post);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const postId = '1';
      await controller.deletePost(postId);
      expect(service.deletePost).toHaveBeenCalledWith(postId);
    });
  });
});
