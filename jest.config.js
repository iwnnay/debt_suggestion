module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/specs',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(.*|(\\.|/)spec)\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
};
