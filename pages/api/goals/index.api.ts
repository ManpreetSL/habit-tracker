import { NextApiRequest, NextApiResponse } from 'next';
import { startOfDay, sub } from 'date-fns';
import logger from '../../../src/services/logger';
import { getGoals } from './controller';
import { auth } from '../../../src/services/auth/firebase-admin';

const DEFAULT_DAYS = 7;

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
    let { fromDate, toDate } = req.query;

    if (typeof fromDate !== 'string') {
      fromDate = '';
    }

    if (typeof toDate !== 'string') {
      toDate = '';
    }

    // How do I confirm what types the query args are?
    // can use typeof to make sure it's a string
    // But then also cast them to dates and check if they're valid dates - if not, return an error?
    logger.debug({ uid, email });
    logger.debug({ fromDate, toDate });

    // Go to the start of the given date
    if (fromDate) {
      // TODO: What happens if it's not a valid date value that's passed?
      fromDate = startOfDay(new Date(fromDate)).toUTCString();
    }

    // If no dates given, then calculate the last default days period
    if (!fromDate && !toDate) {
      const today = new Date();
      toDate = today.toUTCString();
      const fromDateWithTime = sub(today, { days: DEFAULT_DAYS });
      // Now get midnight
      fromDate = startOfDay(new Date(fromDateWithTime)).toUTCString();
    }

    logger.debug({ fromDate, toDate });

    // TODO: Add dates into the Prisma query
    // entry.completionDate >= date
    const goals = await getGoals({ userId: uid, fromDate, toDate });
    // const goalsString = JSON.stringify(goals);
    logger.debug({ goals });
    // logger.debug({ goalsString });

    // return res.status(200).json({ goals: goalsString });
    return res.status(200).json({ goals });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
