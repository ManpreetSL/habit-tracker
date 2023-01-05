module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  modulePathIgnorePatterns: ['.next'],
  setupFilesAfterEnv: ['<rootDir>/setUpTests.js']
};
