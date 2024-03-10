import { NextApiRequest, NextApiResponse } from 'next';
import { sub } from 'date-fns';
import prisma from '../../../../prisma/prisma-db';
import logger from '../../../../src/services/logger';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;
  logger.debug('saving default goals for', userId);

  if (req.method === 'POST') {
    // Set up default habits
    const goal = await prisma.goal.create({
      data: {
        userId,
        name: 'Improve health',
        description:
          'Improve physical and mental health so I can feel better about living life',
      },
    });

    const goalId = goal.id;

    const today = new Date();

    const yesterday = sub(today, { days: 1 });
    const twoDaysAgo = sub(today, {
      days: 2,
      hours: 3,
      minutes: 57,
      seconds: 48,
    });
    const sevenDaysAgo = sub(today, {
      days: 7,
      hours: 3,
      minutes: 57,
      seconds: 48,
    });

    await prisma.habit.create({
      data: {
        name: 'Do 10 mins of Simran',
        frequencyUnit: 'daily',
        frequencyQuantity: 1,
        targetUnit: 'minutes',
        targetQuantity: 5,
        streak: 2,
        goalId,
        entries: {
          createMany: {
            data: [
              {
                completionDate: yesterday,
                quantity: 5,
              },
              {
                completionDate: twoDaysAgo,
                quantity: 3,
              },
            ],
          },
        },
      },
    });

    await prisma.habit.create({
      data: {
        name: 'Play badminton',
        description:
          'Play badminton twice per week so I can get my heart rate into zones 2-3 more regularly',
        frequencyUnit: 'weekly',
        frequencyQuantity: 2,
        targetUnit: 'session',
        targetQuantity: 1,
        streak: 234,
        goalId,
        entries: {
          createMany: {
            data: [
              {
                completionDate: yesterday,
                quantity: 1,
              },
              {
                completionDate: twoDaysAgo,
                quantity: 1,
              },
              {
                completionDate: sevenDaysAgo,
                quantity: 1,
              },
            ],
          },
        },
      },
    });

    // Return the resulting goal along with its child habits and entries
    const goals = await prisma.goal.findMany({
      include: {
        habits: {
          include: {
            entries: true,
          },
        },
      },
    });

    return res.status(201).json(goals);
  }

  return res.status(500).json([]);
};

export default handler;
