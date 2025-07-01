module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src/shared'],
  moduleNameMapper: {
    '^@controllers/(.*)$': '<rootDir>/src/post/controllers/$1',
    '^@services/(.*)$': '<rootDir>/src/post/services/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@shared/interceptors/(.*)$': '<rootDir>/src/shared/interceptors/$1',
  
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/main.ts', // exclua arquivos que você não deseja cobrir
    '!src/**/*.module.ts', // exclua arquivos que você não deseja cobrir
    '!src/**/index.ts', // exclua arquivos que você não deseja cobrir
  ],
};