import { Slot } from './slot.interface';

export interface Schedule {
  sellerCode: string;
  slots: Slot[],
}
