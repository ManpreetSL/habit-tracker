import type { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';

const globalStyles = css({
  '*': {
    boxSizing: 'border-box'
  },
  '@media (prefers-color-scheme: dark)': {
    body: {
      color: '#fff',
      backgroundColor: '#292735'
    },
    html: {
      colorScheme: 'dark'
    }
  },
  body: {
    padding: 0,
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
  },
  a: {
    color: 'inherit',
    textDecoration: 'none'
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}
