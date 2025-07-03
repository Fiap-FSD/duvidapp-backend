import { Test, TestingModule } from '@nestjs/testing';
import { DuvidaService } from './duvida.service';
import { DuvidaRepository } from '../repositories/duvida.repository';
import { NotFoundException } from '@nestjs/common';

// Mock para o DuvidaRepository
const mockDuvidaRepository = {
  getAllDuvida: jest.fn(),
  getDuvidaById: jest.fn(),
  createDuvida: jest.fn(),
  updateDuvida: jest.fn(),
  deleteDuvida: jest.fn(),
  searchDuvidas: jest.fn(),
};

describe('DuvidaService', () => {
  let service: DuvidaService;
  let repository: DuvidaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DuvidaService,
        {
          provide: DuvidaRepository,
          useValue: mockDuvidaRepository,
        },
      ],
    }).compile();

    service = module.get<DuvidaService>(DuvidaService);
    repository = module.get<DuvidaRepository>(DuvidaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllDuvida', () => {
    it('should return all duvidas', async () => {
      const limit = 10;
      const page = 1;
      const duvidas = [
        {
          id: '1',
          title: 'Test Duvida',
          author: 'Author',
          intro: 'Intro',
          content: 'Content',
        },
      ];
      jest.spyOn(repository, 'getAllDuvida').mockResolvedValue(duvidas);

      const result = await service.getAllDuvida(limit, page);
      expect(result).toEqual(duvidas);
      expect(repository.getAllDuvida).toHaveBeenCalledWith(limit, page);
    });
  });

  describe('getDuvidaById', () => {
    it('should return a duvida by id', async () => {
      const duvidaId = '1';
      const duvida = {
        id: duvidaId,
        title: 'Test Duvida',
        author: 'Author',
        intro: 'Intro',
        content: 'Content',
      };
      jest.spyOn(repository, 'getDuvidaById').mockResolvedValue(duvida);

      const result = await service.getDuvidaById(duvidaId);
      expect(result).toEqual(duvida);
      expect(repository.getDuvidaById).toHaveBeenCalledWith(duvidaId);
    });

    it('should throw NotFoundException if duvida is not found', async () => {
      const duvidaId = 'nonexistent';
      jest.spyOn(repository, 'getDuvidaById').mockResolvedValue(null);

      await expect(service.getDuvidaById(duvidaId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createDuvida', () => {
    it('should create a new duvida', async () => {
      jest.spyOn(repository, 'createDuvida').mockResolvedValue(undefined);

      const result = await service.createDuvida(undefined);
      expect(result).toEqual(undefined);
      expect(repository.createDuvida).toHaveBeenCalledWith(undefined);
    });
  });

  describe('updateDuvida', () => {
    it('should update a duvida', async () => {
      const duvidaId = '1';
      const updateDuvida = {
        id: duvidaId,
        title: 'Updated Duvida',
        author: 'Updated Author',
        intro: 'Updated Intro',
        content: 'Updated Content',
      };
      jest.spyOn(repository, 'updateDuvida').mockResolvedValue(updateDuvida);

      const result = await service.updateDuvida(duvidaId, updateDuvida);
      expect(result).toEqual(updateDuvida);
      expect(repository.updateDuvida).toHaveBeenCalledWith(
        duvidaId,
        updateDuvida,
      );
    });

    it('should throw NotFoundException if duvida is not found', async () => {
      const duvidaId = 'nonexistent';
      jest.spyOn(repository, 'updateDuvida').mockResolvedValue(null);

      await expect(
        service.updateDuvida(duvidaId, {
          title: '',
          intro: '',
          author: '',
          content: '',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteDuvida', () => {
    it('should delete a duvida', async () => {
      const duvidaId = '1';
      jest.spyOn(repository, 'deleteDuvida').mockResolvedValueOnce(undefined);

      const result = await service.deleteDuvida(duvidaId);
      expect(repository.deleteDuvida).toHaveBeenCalledWith(duvidaId);
      // Aqui, estamos assumindo que deleteDuvida retorna um boolean indicando sucesso
      expect(result).toBe(undefined);
    });
  });

  describe('searchDuvidas', () => {
    it('should search duvidas by keyword', async () => {
      const keyword = 'test';
      const searchResults = [
        {
          id: '1',
          title: 'Test Duvida',
          intro: 'Intro',
          author: 'Author',
          content: 'Content',
        },
      ];
      jest.spyOn(repository, 'searchDuvidas').mockResolvedValue(searchResults);

      const result = await service.searchDuvidas(keyword);
      expect(result).toEqual(searchResults);
      expect(repository.searchDuvidas).toHaveBeenCalledWith(keyword);
    });
  });
});
