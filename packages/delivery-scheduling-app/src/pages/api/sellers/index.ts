import axios from 'axios';
import { Seller } from '../../../interfaces/seller.interface';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseError = {
    statusCode: 500,
    message: string,
}

export const getSellers = async (): Promise<{ sellers: Seller[] }> => {
  try {
    const api = process.env.apiBaseUrl as string;
    const url = `${api}/sellers`;
    const { data } = await axios.get<{ sellers: Seller[] }>(url);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const handler = async (_req: NextApiRequest, res: NextApiResponse<{ sellers: Seller[] } | ResponseError>): Promise<void>  => {
  try {
    const data = await getSellers();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: (err as Error).message,
    });
  }
};

export default handler;
