import Head from 'next/head';
import { css } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Habits from '../components/Habits';
import Link from '../src/components/Link';

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'app', 'habit'])),
    },
  };
}

const styles = {
  container: css({
    boxSizing: 'border-box',
    backgroundColor: '#111',
    color: '#fff',
    textAlign: 'center',
    minHeight: '100vh',
    maxWidth: '100%',
    padding: '0',
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

  footer: css({
    display: 'flex',
    flex: 1,
    maxHeight: '70px',
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
        <Habits />
      </main>

      <footer css={styles.footer}>
        <p>
          <Link href='/about'>{t('app:links.about')}</Link>
        </p>
      </footer>
    </div>
  );
};

export default Home;
