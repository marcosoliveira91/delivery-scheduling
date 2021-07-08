import axios from 'axios';
import { Slot } from '../../../interfaces/slot.interface';
import type { NextApiRequest, NextApiResponse } from 'next';

type SlotQuery = {
  sellerCode: string;
  untilDate: string;
}

type ResponseError = {
    statusCode: 500,
    message: string,
}

export const getSlots = async ({ sellerCode, untilDate }: SlotQuery): Promise<{ slots: Slot[] }> => {
  try {
    const api = process.env.apiBaseUrl as string;
    const url = `${api}/slots?sellerCode=${sellerCode}&untilDate=${untilDate}`;
    const { data } = await axios.get<{ slots: Slot[] }>(url);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<{ slots: Slot[] } | ResponseError>): Promise<void>  => {
  try {
    const { sellerCode, untilDate } = req.query;
    const data = await getSlots({
      sellerCode: Array.isArray(sellerCode) ? sellerCode[0] : sellerCode,
      untilDate: Array.isArray(untilDate) ? untilDate[0] : untilDate,
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: (err as Error).message,
    });
  }
};

export default handler;
