import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { auth } from '../../src/services/auth/firebase-admin';
import logger from '../../src/services/logger';

export const verifyCookies = async (context: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(context);

    if (!cookies.token) {
      return null;
    }

    const token = await auth.verifyIdToken(cookies.token);
    logger.info({ token });

    return token;
  } catch (error) {
    if ((error as Error)?.name === 'auth/id-token-expired') {
      logger.error('token invalid');
    }
    logger.error('Failed to verify cookie', error);
    return null;
  }
};

export default {};
