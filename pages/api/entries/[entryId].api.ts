import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prisma-db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { entryId } = req.query;

    if (!entryId) return res.status(405).end();
    if (typeof entryId !== 'string') return res.status(405).end();

    const response = await prisma.entry.delete({
      where: {
        id: entryId,
      },
    });

    return res.status(200).json(response);
  }

  return res.status(500);
}
