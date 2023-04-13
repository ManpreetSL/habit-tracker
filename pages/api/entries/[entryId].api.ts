import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { entryId } = req.query;

  if (!entryId) return res.status(405);
  if (typeof entryId !== 'string') return res.status(405);

  if (req.method === 'DELETE') {
    // Delete entry <id>
    return res.status(200);
  }

  return res.status(500);
}
