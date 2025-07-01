import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostService } from '../src/post/services/post.service';
import { PostRepository } from '../src/post/repositories/post.repository';

describe('PostService', () => {
  let postService: PostService;
  let postRepository: Partial<PostRepository>;

  beforeEach(async () => {
    postRepository = {
      getAllPost: jest.fn(),
      getPostById: jest.fn(),
      createPost: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: PostRepository, useValue: postRepository },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  describe('getAllPost', () => {
    it('should return all posts', async () => {
      const mockPosts = [
        { id: '1', title: 'Test Post', intro: 'Intro', content: 'Content' },
      ];
      jest.spyOn(postRepository, 'getAllPost').mockResolvedValue(mockPosts);

      const result = await postService.getAllPost(10, 1);

      expect(result).toEqual(mockPosts);
      expect(postRepository.getAllPost).toHaveBeenCalledWith(10, 1);
    });
  });

  describe('getPostById', () => {
    it('should return a post if found', async () => {
      const mockPost = {
        id: '1',
        title: 'Test Post',
        intro: 'Intro',
        content: 'Content',
      };
      jest.spyOn(postRepository, 'getPostById').mockResolvedValue(mockPost);

      const result = await postService.getPostById('1');

      expect(result).toEqual(mockPost);
      expect(postRepository.getPostById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if post is not found', async () => {
      jest.spyOn(postRepository, 'getPostById').mockResolvedValue(null);

      await expect(postService.getPostById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
