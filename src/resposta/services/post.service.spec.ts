import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PostRepository } from '../repositories/post.repository';
import { NotFoundException } from '@nestjs/common';
import { IPost } from '../schemas/models/post.interface';

// Mock para o PostRepository
const mockPostRepository = {
  getAllPost: jest.fn(),
  getPostById: jest.fn(),
  createPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
  searchPosts: jest.fn(),
};

describe('PostService', () => {
  let service: PostService;
  let repository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PostRepository,
          useValue: mockPostRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    repository = module.get<PostRepository>(PostRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPost', () => {
    it('should return all posts', async () => {
      const limit = 10;
      const page = 1;
      const posts = [{ id: '1', title: 'Test Post', intro: 'Intro', content: 'Content' }];
      jest.spyOn(repository, 'getAllPost').mockResolvedValue(posts);

      const result = await service.getAllPost(limit, page);
      expect(result).toEqual(posts);
      expect(repository.getAllPost).toHaveBeenCalledWith(limit, page);
    });
  });

  describe('getPostById', () => {
    it('should return a post by id', async () => {
      const postId = '1';
      const post = { id: postId, title: 'Test Post', intro: 'Intro', content: 'Content' };
      jest.spyOn(repository, 'getPostById').mockResolvedValue(post);

      const result = await service.getPostById(postId);
      expect(result).toEqual(post);
      expect(repository.getPostById).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postId = 'nonexistent';
      jest.spyOn(repository, 'getPostById').mockResolvedValue(null);

      await expect(service.getPostById(postId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const newPost = { title: 'Title', content: 'Content', intro: 'Intro' };
      jest.spyOn(repository, 'createPost').mockResolvedValue(undefined);

      const result = await service.createPost(undefined);
      expect(result).toEqual(undefined);
      expect(repository.createPost).toHaveBeenCalledWith(undefined);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const postId = '1';
      const updatedPost = { id: postId, title: 'Updated Post', intro: 'Updated Intro', content: 'Updated Content' };
      jest.spyOn(repository, 'updatePost').mockResolvedValue(updatedPost);

      const result = await service.updatePost(postId, updatedPost);
      expect(result).toEqual(updatedPost);
      expect(repository.updatePost).toHaveBeenCalledWith(postId, updatedPost);
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postId = 'nonexistent';
      jest.spyOn(repository, 'updatePost').mockResolvedValue(null);

      await expect(service.updatePost(postId, { title: '', intro: '', content: '' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const postId = '1';
      jest.spyOn(repository, 'deletePost').mockResolvedValueOnce(undefined);

      const result = await service.deletePost(postId);
      expect(repository.deletePost).toHaveBeenCalledWith(postId);
      // Aqui, estamos assumindo que deletePost retorna um boolean indicando sucesso
      expect(result).toBe(undefined);
    });
  });

  describe('searchPosts', () => {
    it('should search posts by keyword', async () => {
      const keyword = 'test';
      const searchResults = [{ id: '1', title: 'Test Post', intro: 'Intro', content: 'Content' }];
      jest.spyOn(repository, 'searchPosts').mockResolvedValue(searchResults);

      const result = await service.searchPosts(keyword);
      expect(result).toEqual(searchResults);
      expect(repository.searchPosts).toHaveBeenCalledWith(keyword);
    });
  });
});