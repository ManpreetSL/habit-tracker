import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../src/services/logger';
import { deleteHabit } from './controller';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { habitId } = req.query;

  logger.debug('received req at /api/habits/ with id', habitId);

  if (!habitId) return res.status(405);

  if (typeof habitId !== 'string') return res.status(405);

  if (req.method === 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // if (!req.body) {
  //   return res.status(407).json({ message: 'Invalid request body' });
  // }

  if (req.method === 'DELETE') {
    // Delete habit <id>
    logger.debug('Deleting habit with id', habitId);
    const deletedId = await deleteHabit(habitId);

    if (deletedId) {
      return res.status(204).end();
    }
  }

  // const goalsData = JSON.parse(req.body);

  logger.debug('received post at /api/habits/');

  return res.status(200).json({ goal: /* goalsData */ {}, name: 'Mr Singh' });
}
