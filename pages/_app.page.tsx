import type { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';
import { AuthProvider } from '../src/services/auth/AuthContext';
import { UserProvider } from '../src/services/auth/UserContext';

const globalStyles = css({
  '*': {
    boxSizing: 'border-box',
  },
  '@media (prefers-color-scheme: dark)': {
    body: {
      color: '#fff',
      backgroundColor: '#292735',
    },
    html: {
      colorScheme: 'dark',
    },
  },
  body: {
    padding: 0,
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    color: '#fff',
    backgroundColor: '#292735',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <UserProvider>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </UserProvider>
  </AuthProvider>
);

export default appWithTranslation(App);
