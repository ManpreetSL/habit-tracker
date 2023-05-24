import Head from 'next/head';
import { css } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import Link from '../src/components/Link';
import Habits from '../components/Habits';
import AccountMenu from '../components/AccountMenu';
import logger from '../src/services/logger';
import { GoalWithHabitsAndEntries } from '../prisma/types';
import { getGoals } from './api/goals/controller';
import { verifyCookies } from './api/utils';
import { transformGoals } from './api/goal-utils';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale = 'en' } = context;
  const defaultProps = {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'app', 'habit'])),
      goalsProp: JSON.stringify([]),
      uid: '',
    },
  };

  try {
    const token = await verifyCookies(context);

    if (!token) {
      logger.debug('null token');

      return defaultProps;
    }

    const goals = await getGoals(token.user_id);

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'app', 'habit'])),
        goalsProp: JSON.stringify(goals),
        uid: token.uid,
      },
    };
  } catch (error) {
    // Basically, how do I find out if the token has expired?
    logger.error(error);
  }

  return defaultProps;
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
  goalsProp: string;
  userId: string;
};

const Home = ({ goalsProp, userId }: HomeProps) => {
  const { t } = useTranslation();

  const rawGoals: GoalWithHabitsAndEntries[] = JSON.parse(goalsProp);
  const goals = transformGoals(rawGoals);
  logger.debug({ goals });

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

        <Habits goals={goals} cookieUserId={userId} />

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
