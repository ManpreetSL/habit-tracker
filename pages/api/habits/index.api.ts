import { NextApiRequest, NextApiResponse } from 'next';
import { HabitFlat } from '../../../src/types/habits';
import prisma from '../../../prisma/prisma-db';
import logger from '../../../src/services/logger';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    logger.debug({ body });

    const {
      name,
      description,
      frequencyUnit,
      frequencyQuantity,
      targetUnit,
      targetQuantity,
    }: HabitFlat = body;
    const { goalId } = body;

    logger.debug({
      name,
      description,
      frequencyUnit,
      frequencyQuantity,
      targetUnit,
      targetQuantity,
      goalId,
    });

    const createdHabit = await prisma.habit.create({
      data: {
        name,
        description,
        frequencyUnit,
        frequencyQuantity,
        targetUnit,
        targetQuantity,
        streak: 4,
        goalId,
      },
    });

    return res.status(200).json(createdHabit);
  }

  if (req.method === 'GET') {
    const { date } = req.query;

    logger.debug('query:', date);
    // entry.completionDate >= date
    const habits = await prisma.habit.findMany();
    logger.debug({ habits });
    // TODO: Check query params for a given date
    res.status(200).json(habits);
  }

  return res.status(500);
};

export default handler;
