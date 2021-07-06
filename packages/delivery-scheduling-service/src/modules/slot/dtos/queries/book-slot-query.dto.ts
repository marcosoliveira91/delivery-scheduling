import { SlotDto } from '../slot.dto';

export type BookSlot = Pick<SlotDto, 'sellerCode'> & {
  customerCode: string;
};
