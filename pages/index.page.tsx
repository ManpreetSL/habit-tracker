import Head from 'next/head';
import { css } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import Link from '../src/components/Link';
import Habits from '../components/Habits';
import AccountMenu from '../components/AccountMenu';
import { auth } from '../src/services/auth/firebase-admin';
import logger from '../src/services/logger';
import prisma from '../prisma/prisma-db';
import { GoalWithHabitsAndEntries } from '../prisma/types';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { locale = 'en' } = ctx;

  try {
    const cookies = nookies.get(ctx);
    const token = await auth.verifyIdToken(cookies.token);

    let goals: GoalWithHabitsAndEntries[] = [];
    if (token) {
      goals = await prisma.goal.findMany({
        include: {
          habits: {
            include: {
              entries: true,
            },
          },
        },
      });
    }

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'app', 'habit'])),
        goals,
      },
    };
  } catch (error) {
    logger.error(error);
  }
  return {
    props: {} as never,
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

  header: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    maxHeight: '70px',
    padding: '2rem 0',
    borderTop: '1px solid #eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};

type HomeProps = {
  goals: GoalWithHabitsAndEntries[];
};

const Home = ({ goals }: HomeProps) => {
  const { t } = useTranslation();

  return (
    <div css={styles.container}>
      <Head>
        <title>{t('common:app.title')}</title>
        <meta name='description' content={t('common:app.description') || ''} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main css={styles.main}>
        <header css={styles.header}>
          <AccountMenu />
        </header>

        <Habits goals={goals} />

        <footer css={styles.footer}>
          <p>
            <Link href='/about'>{t('app:links.about')}</Link>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
