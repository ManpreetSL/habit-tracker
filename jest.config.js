module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  modulePathIgnorePatterns: ['.next'],
  setupFilesAfterEnv: ['<rootDir>/test/set-up-tests.ts'],
};
