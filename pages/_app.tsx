import type { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';

const globalStyles = css({
  '*': {
    boxSizing: 'border-box',
  },
  '@media (prefers-color-scheme: dark)': {
    body: {
      color: '#fff',
      backgroundColor: '#000',
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

const App = ({ Component, pageProps }: AppProps) => (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );

export default appWithTranslation(App);
