import { Slot } from '../slot.entity';

export type BookSlotQuery = Slot & {
  customerCode: string;
};
