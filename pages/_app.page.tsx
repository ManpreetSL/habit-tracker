import type { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';
import UserContext from '../src/services/auth/UserContext';

const globalStyles = css({
  '*': {
    boxSizing: 'border-box',
  },
  '@media (prefers-color-scheme: dark)': {
    body: {
      color: '#fff',
      backgroundColor: '#292735'
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
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

const defaultUser = {
  name: 'Natsu',
  email: 'natsu@fairytail.guild',
  password: 'LucyIsTheBest',
};

const App = ({ Component, pageProps }: AppProps) => (
  <UserContext.Provider value={defaultUser}>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </UserContext.Provider>
);

export default appWithTranslation(App);
