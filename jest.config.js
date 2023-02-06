module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    'react-i18next': '<rootDir>/test/__mocks__/react-i18next.ts',
  },
  modulePathIgnorePatterns: ['.next'],
  setupFilesAfterEnv: ['<rootDir>/test/set-up-tests.js'],
};
