import { Slot } from '../slot.entity';

export type FindAllSlotsQuery = Pick<Slot, 'sellerCode' | 'status'> & {
  fromDate: string;
  untilDate: string;
};
