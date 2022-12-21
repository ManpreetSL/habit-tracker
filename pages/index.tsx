import Head from 'next/head';
import Image from 'next/image';
import { css } from '@emotion/react';
import Link from '../src/components/Link';
import ViewHabits from '../components/ViewHabits';

const styles = {
  container: css({
    boxSizing: 'border-box',
    backgroundColor: '#0066ff',
    color: '#fff',
    textAlign: 'center',
    minHeight: '100vh',
    padding: '4rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }),

  title: css({
    margin: '24px 0px',
    lineHeight: '1.15',
    fontSize: '3rem'
  }),

  links: css({
    display: 'flex',
    flexDirection: 'column'
  }),

  logo: css({
    height: '1em',
    marginLeft: '0.5rem'
  }),

  footer: css({
    display: 'flex',
    flex: 1,
    maxHeight: 70,
    padding: '2rem 0',
    borderTop: '1px solid #eaeaea',
    justifyContent: 'center',
    alignItems: 'center'
  })
};

const Home = () => {
  return (
    <div css={styles.container}>
      <Head>
        <title>.SHIFT habit tracker</title>
        <meta name='description' content='A habit tracker' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 css={styles.title}>Welcome to .SHIFT habit tracker!</h1>
        <ViewHabits />

        <p>
          <Link href={`/about`}>About the app</Link>
        </p>

        <p css={styles.links}>
          <Link href={`/profile/Manpreet`}>Manpreet Singh</Link>
          <Link href={`profile/Harjot`}>Harjot Singh</Link>
          <Link href={`profile/Gurpreet`}>Gurpreet Kaur</Link>
          <Link href={`/profile/Hardeep`}>Hardeep Kaur</Link>
          <br />
        </p>
      </main>

      <footer css={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span css={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
