import Head from 'next/head';
import Image from 'next/image';
import { css } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Habits from '../components/Habits';
import Link from '../src/components/Link';
import 'react-toastify/dist/ReactToastify.css';

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'app'])),
      // Will be passed to the page component as props
    },
  };
}

const styles = {
  container: css({
    boxSizing: 'border-box',
    backgroundColor: '#0066ff',
    color: '#fff',
    textAlign: 'center',
    minHeight: '100vh',
    maxWidth: '100%',
    padding: '4rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),

  main: css({
    width: '100vw',
    maxWidth: '100%',
  }),

  title: css({
    margin: '24px 0px',
    lineHeight: '1.15',
    fontSize: '3rem',
  }),

  links: css({
    display: 'flex',
    flexDirection: 'column',
  }),

  logo: css({
    height: '1em',
    marginLeft: '0.5rem',
  }),

  footer: css({
    display: 'flex',
    flex: 1,
    maxHeight: 70,
    padding: '2rem 0',
    borderTop: '1px solid #eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};

const Home = () => {
  const { t } = useTranslation();

  return (
    <div css={styles.container}>
      <Head>
        <title>{t('common:app.title')}</title>
        <meta name='description' content={t('common:app.description') || ''} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main css={styles.main}>
        <h1 css={styles.title}>{t('app:welcome')}</h1>
        <Habits />

        <p>
          <Link href='/about'>{t('app:links.about')}</Link>
        </p>

        <p css={styles.links}>
          <Link href='/profile/Manpreet'>Manpreet Singh</Link>
          <Link href='profile/Harjot'>Harjot Singh</Link>
          <Link href='profile/Gurpreet'>Gurpreet Kaur</Link>
          <Link href='/profile/Hardeep'>Hardeep Kaur</Link>
          <br />
        </p>
      </main>

      <footer css={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('app:vercelPowered')}{' '}
          <span css={styles.logo}>
            <Image
              src='/vercel.svg'
              alt={t('app:images.vercel')}
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
