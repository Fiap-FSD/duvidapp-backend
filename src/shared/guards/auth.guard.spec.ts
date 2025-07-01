// auth.guard.spec.ts
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('extractTokenFromHeader', () => {
    it('should extract token from header when Bearer token is present', () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer token123',
        },
      } as any;

      expect(guard['extractTokenFromHeader'](mockRequest)).toBe('token123');
    });

    it('should return null if no Bearer token is present', () => {
      const mockRequest = {
        headers: {
          authorization: 'OtherScheme token123',
        },
      } as any;

      expect(guard['extractTokenFromHeader'](mockRequest)).toBeNull();
    });

    it('should return null if no authorization header is present', () => {
      const mockRequest = {
        headers: {},
      } as any;

      expect(guard['extractTokenFromHeader'](mockRequest)).toBeNull();
    });
  });

  describe('canActivate', () => {
    it('should throw UnauthorizedException if no token is provided', async () => {
      const context = {
        switchToHttp: jest.fn(() => ({
          getRequest: jest.fn(() => ({
            headers: {},
          })),
        })),
      } as unknown as ExecutionContext;

      await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if token verification fails', async () => {
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error('Invalid token'));

      const context = {
        switchToHttp: jest.fn(() => ({
          getRequest: jest.fn(() => ({
            headers: {
              authorization: 'Bearer invalidToken',
            },
          })),
        })),
      } as unknown as ExecutionContext;

      await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

    it('should attach user to request and return true when token is valid', async () => {
      const mockPayload = { userId: '1', username: 'test' };
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);

      const mockRequest = {
        headers: {
          authorization: 'Bearer validToken',
        },
      };
      const context = {
        switchToHttp: jest.fn(() => ({
          getRequest: jest.fn(() => mockRequest),
        })),
      } as unknown as ExecutionContext;

      const canActivate = await guard.canActivate(context);
      expect(canActivate).toBe(true);
      expect(mockRequest['user']).toEqual(mockPayload);
    });
  });
});