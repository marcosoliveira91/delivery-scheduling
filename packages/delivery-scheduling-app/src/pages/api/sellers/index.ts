import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {

    // TODO: implement api calls
    const data = await Promise.resolve({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: (err as Error).message,
    });
  }
};

export default handler;
