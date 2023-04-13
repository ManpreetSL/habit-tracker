import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Check if the req body is an array or a single one
    const savedGoalId = 'saved id';
    return res.status(200).json({ id: savedGoalId });
  }

  if (req.method === 'GET') {
    // TODO: Check query params for a given date
    res.status(200).json([{ id: 'this will be an array of habits' }]);
  }

  return res.status(500);
};

export default handler;
