export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootdir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
