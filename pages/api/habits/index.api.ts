import { NextApiRequest, NextApiResponse } from 'next';

import habitsApi from '../../../src/api/habits';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const savedGoalId = await habitsApi.addHabit();
  return res.status(200).json({ id: savedGoalId });
};

export default handler;
