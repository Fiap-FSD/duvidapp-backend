import { LoggingInterceptor } from './logging.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingInterceptor],
    }).compile();

    interceptor = module.get<LoggingInterceptor>(LoggingInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should log request headers and execution time', (done) => {
    const mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        headers: { 'some-header': 'value' }
      }),
    } as unknown as ExecutionContext;

    const mockCallHandler: CallHandler = {
      handle: jest.fn(() => of('mock response')),
    };

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    const result = interceptor.intercept(mockExecutionContext, mockCallHandler);
    if (result instanceof Observable) {
      result.subscribe(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith({ 'some-header': 'value' });
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/^Request took \d+ms$/));
        done();
      });
    } else {
      result.then(obs => obs.subscribe(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith({ 'some-header': 'value' });
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/^Request took \d+ms$/));
        done();
      }));
    }
  });
});