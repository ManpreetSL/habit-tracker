import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prisma-db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { habitId, date = new Date(), quantity = 1 } = req.body;

    // if (!habitId)
    // Return error

    let formattedDate = date;
    if (typeof date === 'string') {
      formattedDate = new Date(date);
    }

    const { id } = await prisma.entry.create({
      data: { habitId, completionDate: formattedDate, quantity },
    });

    return res.status(200).json({ id });
  }

  return res.status(500);
};

export default handler;
