import { Slot } from '../slot.entity';

export type FindAllSlotsQuery = Pick<Slot, 'sellerCode' | 'status'> & {
  fromDate: string;
  toDate: string;
};
