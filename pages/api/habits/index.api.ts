import { NextApiRequest, NextApiResponse } from 'next';
import { HabitFlat } from '../../../src/types/habits';
import prisma from '../../../prisma/prisma-db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    // TODO: Check if the req body is an array or a single one
    const {
      name,
      description,
      frequencyUnit,
      frequencyQuantity,
      targetUnit,
      targetQuantity,
    }: HabitFlat = body;

    const createdHabit = await prisma.habit.create({
      data: {
        name,
        description,
        frequencyUnit,
        frequencyQuantity,
        targetUnit,
        targetQuantity,
        streak: 4,
      },
    });

    return res.status(200).json(createdHabit);
  }

  if (req.method === 'GET') {
    // TODO: Check query params for a given date
    res.status(200).json([{ id: 'this will be an array of habits' }]);
  }

  return res.status(500);
};

export default handler;
