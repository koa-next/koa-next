module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/test/.*|(\\.|/)test)\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  // collectCoverage: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    'jest.config.js'
  ]
};
