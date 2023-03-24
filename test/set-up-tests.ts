import '@testing-library/jest-dom';
import nexti18next from '../__mocks__/next-i18next';

jest.mock('../src/services/auth/manage-users');
jest.mock('next-i18next', () => ({ ...nexti18next }));
