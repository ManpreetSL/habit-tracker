import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const savedEntryId = 'saved entry id';
    return res.status(200).json({ id: savedEntryId });
  }

  return res.status(500);
};

export default handler;
