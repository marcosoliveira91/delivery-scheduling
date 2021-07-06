import { Slot } from '../slot.entity';

export type BookSlotQuery = Pick<Slot, 'code' | 'sellerCode'> & {
  customerCode: string;
};
