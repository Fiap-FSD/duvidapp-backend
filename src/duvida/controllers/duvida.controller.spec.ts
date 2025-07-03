import { DuvidaService } from '../services/duvida.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { DuvidaController } from './duvida.controller';

// Mocking the AuthGuard globally
jest.mock('../../shared/guards/auth.guard', () => ({
  AuthGuard: jest.fn(() => ({
    canActivate: jest.fn(() => true),
  })),
}));

// Mocking the DuvidaService
const mockDuvidaService = {
  getAllDuvida: jest.fn(),
  getDuvidaById: jest.fn(),
  createDuvida: jest.fn(),
  updateDuvida: jest.fn(),
  deleteDuvida: jest.fn(),
  searchDuvidas: jest.fn(),
};

describe('DuvidaController', () => {
  let controller: DuvidaController;
  let service: DuvidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DuvidaController],
      providers: [
        {
          provide: DuvidaService,
          useValue: mockDuvidaService,
        },
      ],
    }).compile();

    controller = module.get<DuvidaController>(DuvidaController);
    service = module.get<DuvidaService>(DuvidaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchDuvidas', () => {
    it('should throw BadRequestException if keyword is not provided', async () => {
      await expect(controller.searchDuvidas('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should call searchDuvidas with the correct keyword', async () => {
      const keyword = 'test';
      await controller.searchDuvidas(keyword);
      expect(service.searchDuvidas).toHaveBeenCalledWith(keyword);
    });
  });

  describe('getAllDuvida', () => {
    it('should get all duvidas with given limit and page', async () => {
      const limit = 10;
      const page = 1;
      await controller.getAllDuvida(limit, page);
      expect(service.getAllDuvida).toHaveBeenCalledWith(limit, page);
    });
  });

  describe('getDuvidaById', () => {
    it('should get duvida by id', async () => {
      const duvidaId = '1';
      await controller.getDuvidaById(duvidaId);
      expect(service.getDuvidaById).toHaveBeenCalledWith(duvidaId);
    });
  });

  describe('createDuvida', () => {
    it('should create a new duvida', async () => {
      const duvida = {
        title: 'Title',
        content: 'Content',
        author: 'Author',
        intro: 'Intro',
      };
      await controller.createDuvida(duvida);
      expect(service.createDuvida).toHaveBeenCalledWith(duvida);
    });
  });

  describe('updateDuvida', () => {
    it('should update a post', async () => {
      const duvidaId = '1';
      const updateDuvida = {
        id: duvidaId,
        title: 'Updated Duvida',
        author: 'Updated Author',
        intro: 'Updated Intro',
        content: 'Updated Content',
      };
      await controller.updateDuvida(duvidaId, updateDuvida);
      expect(service.updateDuvida).toHaveBeenCalledWith(duvidaId, updateDuvida);
    });
  });

  describe('deleteDuvida', () => {
    it('should delete a post', async () => {
      const duvidaId = '1';
      await controller.deleteDuvida(duvidaId);
      expect(service.deleteDuvida).toHaveBeenCalledWith(duvidaId);
    });
  });
});
