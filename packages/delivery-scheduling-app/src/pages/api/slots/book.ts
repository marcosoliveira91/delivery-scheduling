import axios from 'axios';
import { Slot } from '../../../interfaces/slot.interface';
import type { NextApiRequest, NextApiResponse } from 'next';

type BookSlotQuery = {
  code: string;
  sellerCode: string;
  customerCode: string;
}

type ResponseError = {
    statusCode: 500,
    message: string,
}

export const bookSlot = async ({ code, sellerCode, customerCode }: BookSlotQuery): Promise<Slot> => {
  try {
    const api: string = process.env.apiBaseUrl;
    const url = `${api}/slots/${code}/book`;

    type Payload = Pick<BookSlotQuery, 'sellerCode' | 'customerCode'>;

    const data = await axios.put<Payload, Slot>(
      url,
      {
        customerCode,
        sellerCode,
      });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Slot | ResponseError>): Promise<void>  => {
  try {
    const { sellerCode, code, customerCode } = req.query;

    const data = await bookSlot({
      code: Array.isArray(code) ? code[0] : code,
      sellerCode: Array.isArray(sellerCode) ? sellerCode[0] : sellerCode,
      customerCode: Array.isArray(customerCode) ? customerCode[0] : customerCode,
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
