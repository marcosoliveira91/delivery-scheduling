import { Slot } from '../slot.entity';

export type IFindAllSlotsQuery = Pick<Slot, 'sellerCode' | 'startDate' | 'endDate' | 'status'>;
