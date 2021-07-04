import { Slot } from '../slot.entity';

export type FindAllSlotsQuery = Pick<Slot, 'sellerCode' | 'startDate' | 'endDate' | 'status'>;
