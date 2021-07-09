import { Seller } from '../seller.entity';

export type PartialUpdateSellerQuery = Partial<Seller> & { code: string; }
