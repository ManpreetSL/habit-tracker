import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../src/services/logger';
import { getGoals } from './controller';
import { auth } from '../../../src/services/auth/firebase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (req.method === 'GET') {
    logger.debug('GET /api/goals/');

    const {
      cookies: { token },
    } = req;

    const verifiedToken = token && (await auth.verifyIdToken(token));

    if (!verifiedToken) {
      return res
        .status(401)
        .json({ message: 'Not Authorised. Please sign up or log in.' });
    }

    const { uid, email = '' } = verifiedToken;
    const { fromDate, toDate } = req.query;

    logger.debug({ uid, email });
    logger.debug({ fromDate, toDate });

    // If no dates, then calculate the last 7 days
    // TODO: Add dates into the Prisma query
    // entry.completionDate >= date
    const goals = await getGoals(uid);
    const goalsString = JSON.stringify(goals);
    logger.debug({ goals });
    logger.debug({ goalsString });

    // return res.status(200).json({ goals: goalsString });
    return res.status(200).json({ goals });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
