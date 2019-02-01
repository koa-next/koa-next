module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/test/.*|(\\.|/)test)\\.ts$',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.koa.json'
    }
  }, 
  moduleFileExtensions: ['ts', 'js'],
  // collectCoverage: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    'jest.config.js'
  ]
};
