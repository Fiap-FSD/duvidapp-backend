import { Test, TestingModule } from '@nestjs/testing';
import { RespostaService } from './resposta.service';
import { RespostaRepository } from '../repositories/resposta.repository';
import { NotFoundException } from '@nestjs/common';

// Mock para o RespostaRepository
const mockRespostaRepository = {
  // getAllResposta: jest.fn(),
  getRespostaById: jest.fn(),
  createResposta: jest.fn(),
  updateResposta: jest.fn(),
  deleteResposta: jest.fn(),
  // searchRespostas: jest.fn(),
};

describe('RespostaService', () => {
  let service: RespostaService;
  let repository: RespostaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RespostaService,
        {
          provide: RespostaRepository,
          useValue: mockRespostaRepository,
        },
      ],
    }).compile();

    service = module.get<RespostaService>(RespostaService);
    repository = module.get<RespostaRepository>(RespostaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('getAllResposta', () => {
  //   it('should return all responses', async () => {
  //     const limit = 10;
  //     const page = 1;
  //     const respostas = [
  //       {
  //         id: '1',
  //         duvidaId: '2',
  //         author: 'Test Author',
  //         content: 'Content',
  //         isVerified: false,
  //         votes: 0,
  //       },
  //     ];
  //     jest.spyOn(repository, 'getAllResposta').mockResolvedValue(respostas);

  //     const result = await service.getAllResposta(limit, page);
  //     expect(result).toEqual(respostas);
  //     expect(repository.getAllResposta).toHaveBeenCalledWith(limit, page);
  //   });
  // });

  describe('getRespostaById', () => {
    it('should return a post by id', async () => {
      const respostaId = '1';
      const duvidaId = '2';
      const resposta = {
        id: respostaId,
        duvidaId,
        author: 'Test Author',
        content: 'Content',
        isVerified: false,
        votes: 0,
      };
      jest.spyOn(repository, 'getRespostaById').mockResolvedValue(resposta);

      const result = await service.getRespostaById(respostaId);
      expect(result).toEqual(resposta);
      expect(repository.getRespostaById).toHaveBeenCalledWith(respostaId);
    });

    it('should throw NotFoundException if response is not found', async () => {
      const respostaId = 'nonexistent';
      jest.spyOn(repository, 'getRespostaById').mockResolvedValue(null);

      await expect(service.getRespostaById(respostaId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createResposta', () => {
    it('should create a new post', async () => {
      jest.spyOn(repository, 'createResposta').mockResolvedValue(undefined);

      const result = await service.createResposta(undefined);
      expect(result).toEqual(undefined);
      expect(repository.createResposta).toHaveBeenCalledWith(undefined);
    });
  });

  describe('updateResposta', () => {
    it('should update a post', async () => {
      const respostaId = '1';
      const duvidaId = '2';
      const updatedResposta = {
        id: respostaId,
        duvidaId,
        author: 'Updated Author',
        content: 'Updated Content',
        isVerified: true,
        votes: 15,
      };
      jest
        .spyOn(repository, 'updateResposta')
        .mockResolvedValue(updatedResposta);

      const result = await service.updateResposta(respostaId, updatedResposta);
      expect(result).toEqual(updatedResposta);
      expect(repository.updateResposta).toHaveBeenCalledWith(
        respostaId,
        updatedResposta,
      );
    });

    it('should throw NotFoundException if response is not found', async () => {
      const respostaId = 'nonexistent';
      jest.spyOn(repository, 'updateResposta').mockResolvedValue(null);

      await expect(
        service.updateResposta(respostaId, {
          author: '',
          content: '',
          isVerified: false,
          votes: 500,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteResposta', () => {
    it('should delete a post', async () => {
      const respostaId = '1';
      jest.spyOn(repository, 'deleteResposta').mockResolvedValueOnce(undefined);

      const result = await service.deleteResposta(respostaId);
      expect(repository.deleteResposta).toHaveBeenCalledWith(respostaId);
      // Aqui, estamos assumindo que deleteResposta retorna um boolean indicando sucesso
      expect(result).toBe(undefined);
    });
  });

  // describe('searchRespostas', () => {
  //   it('should search responses by keyword', async () => {
  //     const keyword = 'test';
  //     const searchResults = [
  //       {
  //         id: '1',
  //         duvidaId: '2',
  //         author: 'Test Author',
  //         content: 'Content test',
  //         isVerified: false,
  //         votes: 0,
  //       },
  //     ];
  //     jest
  //       .spyOn(repository, 'searchRespostas')
  //       .mockResolvedValue(searchResults);

  //     const result = await service.searchRespostas(keyword);
  //     expect(result).toEqual(searchResults);
  //     expect(repository.searchRespostas).toHaveBeenCalledWith(keyword);
  //   });
  // });
});
