import { Seller } from './seller.interface';
import { Slot } from './slot.interface';

export interface Schedule {
  seller: Pick<Seller, 'name' | 'code' >;
  slots: Slot[],
}
