import '@testing-library/jest-dom';
import nexti18next from '../__mocks__/next-i18next';

jest.mock('../src/services/auth/useUser');
jest.mock('../src/services/auth/manage-users');
jest.mock('next-i18next', () => ({ ...nexti18next }));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/',
    query: '',
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }),
}));

jest.mock('firebase/analytics', () => ({
  getAnalytics: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));
