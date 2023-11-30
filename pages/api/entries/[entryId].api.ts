import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../src/services/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  logger.debug(req.method, '@/api/entries');
  if (req.method === 'DELETE') {
    const { entryId } = req.query;

    if (!entryId) return res.status(405).end();
    if (typeof entryId !== 'string') return res.status(405).end();

    // Delete entry <id>
    return res.status(200);
  }

  return res.status(500);
}
